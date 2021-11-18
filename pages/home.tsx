import Menubar from '../components/menubar';
import homeStyles from '../styles/home.module.css';
import Flash from '../components/flash';
import ResearchBar from '../components/researchBar';
import { ProtectRoute } from '../components/protectRouter';
import { useDispatch } from 'react-redux';
import { setUsers } from '../redux/usersSlice';
import { setPosts } from '../redux/postsSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export function Modal({ show, setShow }) {
  const user = useSelector((state: RootState) => state.users.user);
  const [content, setContent] = useState('');

  const sendPost = async () => {
    const cookie = Cookies.get('jwt');
    const post = await fetch(`${process.env.baseURL}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        userId: user.id,
        content: content,
        picture: '',
      }),
    });
    console.log(post);
    await setShow(false);

    alert('投稿しました');
    await router.push('/home');
  };
  if (show) {
    return (
      <div>
        <div className={homeStyles.overlay}>
          <div className={homeStyles.content}>
            <button className={homeStyles.batsu} onClick={() => setShow(false)}>
              ×
            </button>
            <textarea
              maxLength={250}
              className={homeStyles.textarea}
              onChange={(e) => setContent(e.target.value)}
              placeholder='250字以内で入力してください'
            ></textarea>
            {/* <p>{content}</p> */}
            <button className={homeStyles.post_button} onClick={sendPost}>
              投稿する
            </button>
            <p></p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default function Home() {
  // const cookie = Cookies.get('jwt');
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  console.log(cookies.jwt);
  const dispatch = useDispatch();
  const [posts, setPostsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const getPostsData = await fetch(
          'http://localhost:8000/post/page?page=1&limit=20',
          {
            credentials: 'include',
          }
        );

        const getCookie = await axios.get(`${process.env.baseURL}/user/cookie`, {
          withCredentials: true,
        });
        // const cookieData = await getCookie.();
        console.log(getCookie);
        // const response = await fetch(
          // `${process.env.baseURL}/user/cookie`
          // cookies.jwt
          // {
          //   credentials: 'include',
          // }
        // );

        const content = await getCookie.data;
        const postsData = await getPostsData.json();
        console.log(content);
        // if (content.statusCode) {
        //   throw new Error('error');
        // }
        await dispatch(setPosts(postsData.items));
        await dispatch(setUsers(content));
        await setPostsData(postsData.items);
      } catch (e) {}
    };
    getPosts();
  }, [cookies.jwt, dispatch]);

  const fetchPosts = async () => {
    const res = await fetch(
      `${process.env.baseURL}/post/page?page=${page}&limit=20`,
      {
        credentials: 'include',
      }
    );
    const data = await res.json();

    return data.items;
  };

  const fetchData = async () => {
    const componentsFormServer = await fetchPosts();
    setPostsData([...posts, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <ProtectRoute>
      <header>
        <div className={homeStyles.position_fixed}>
          <div className={homeStyles.bodyBackground}>
            <div className={homeStyles.grid_container}>
              <div className={homeStyles.item_A}>
                <div className={homeStyles.menubar_position}>
                  <Menubar show={show} setShow={setShow} />
                </div>
              </div>
              <div className={homeStyles.item_C}>
                <Flash />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className={homeStyles.grid_container2}>
          <div className={homeStyles.item_B2}>
            <ResearchBar />
          </div>
          <div className={homeStyles.item_D2}>
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {posts.map((post) => {
                return (
                  <div className={homeStyles.content_border} key={post.id}>
                    <div
                      className={`${homeStyles.content_name} ${homeStyles.iconTree}`}
                    >
                      {post.user.name}, {post.id}
                    </div>
                    <div className={homeStyles.content_content}>
                      {post.content}
                    </div>
                    <div className={homeStyles.content_bar}>
                      <div className={homeStyles.iconHeart}>50</div>
                      <div className={homeStyles.iconHukidashi}>50</div>
                      <div className={homeStyles.iconRappa}>50</div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
            <Modal
              show={show}
              setShow={setShow}
              // content='Appから内容を変更できます'
            />
          </div>
        </div>
      </main>
    </ProtectRoute>
  );
}
