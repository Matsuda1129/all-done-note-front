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
import axios from 'axios';
import Cookies from 'js-cookie';

export function Heart(props) {
  const [likes, setLikes] = useState();
  const [likesCheck, setLikesCheck] = useState(Boolean);
  const [likesCount, setLikesCount] = useState();
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const getLikesData = await axios({
          method: 'post',
          url: `${process.env.baseURL}/like/get`,
          withCredentials: true,
          data: {
            userId: props.userId,
            postId: props.postId,
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });
        setLikes(getLikesData.data);
        if (!getLikesData.data) {
          setLikesCheck(false);
        } else {
          setLikesCheck(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchLikes();
  }, []);

  const onLike = async () => {
    try {
      await axios({
        method: 'post',
        url: `${process.env.baseURL}/like`,
        data: {
          userId: props.userId,
          postId: props.postId,
        },
        headers: { 'Content-Type': 'application/json' },
      });

      setLikesCheck(true);
    } catch (e) {
      console.log(e);
    }
  };
  const offLike = async () => {
    try {
      await axios({
        method: 'delete',
        url: `${process.env.baseURL}/like/delete`,
        data: {
          userId: props.userId,
          postId: props.postId,
        },
        headers: { 'Content-Type': 'application/json' },
      });
      setLikesCheck(false);
    } catch (e) {
      console.log(e);
    }
  };
  if (!likesCheck) {
    return (
      <div>
        <button className={homeStyles.offHeart} onClick={onLike}></button>
      </div>
    );
  } else {
    return (
      <div>
        <button className={homeStyles.heart} onClick={offLike}></button>
      </div>
    );
  }
}

export function Modal({ show, setShow }) {
  const user = useSelector((state: RootState) => state.users.user);
  const [content, setContent] = useState('');

  const sendPost = async () => {
    await fetch(`${process.env.baseURL}/post`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        userId: user.id,
        content: content,
        picture: '',
      }),
    });
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

type FormValuse = {
  items: [];
};

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const [posts, setPostsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const jwt = Cookies.get('jwt');
        const response = await axios({
          method: 'post',
          url: `${process.env.baseURL}/user/cookie`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });
        const getPostsData = await axios({
          method: 'get',
          url: `${process.env.baseURL}/post/page?page=1&limit=20`,
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json;charset=UTF-8',
          },
        });

        const content = await response.data;
        const postsData: FormValuse = await getPostsData.data;
        await dispatch(setPosts(postsData.items));
        await dispatch(setUsers(content));
        await setPostsData(postsData.items);
      } catch (e) {
        console.log(e);
      }
    };
    getPosts();
  }, [dispatch]);

  const fetchPosts = async () => {
    const jwt = Cookies.get('jwt');
    const res = await axios({
      method: 'get',
      url: `${process.env.baseURL}/post/page?page=${page}&limit=20`,
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
    const data: FormValuse = await res.data;

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
                      {post.user.name},{post.id}
                    </div>
                    <div className={homeStyles.content_content}>
                      {post.content}
                    </div>
                    <div className={homeStyles.content_bar}>
                      <Heart postId={post.id} userId={user.id} />
                      <div className={homeStyles.iconHukidashi}>50</div>
                      <div className={homeStyles.iconRappa}>50</div>
                    </div>
                  </div>
                );
              })}
            </InfiniteScroll>
            <Modal show={show} setShow={setShow} />
          </div>
        </div>
      </main>
    </ProtectRoute>
  );
}
