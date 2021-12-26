import Styles from '../styles/home.module.css';
import { setUsers } from '../redux/usersSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { ProtectRoute } from '../components/components/protectRouter/protectRouter';
import {
  Header,
  InfinitePosts,
  ResearchBar,
  CreatePostModal,
} from '../components/components';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPosts, findPage1 } from '../repositories/posts';
import { findLoginUser } from '../repositories/users';

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const page1 = await findPage1();
        const loginData = await findLoginUser();
        await dispatch(setUsers(loginData));
        await setPosts(page1);
        await setPage(2);
        await setHasMore(true);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [dispatch]);

  const fetchData = async () => {
    const componentsFormServer = await fetchPosts(page);
    setPosts([...posts, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <ProtectRoute>
      <header>
        <Header />
      </header>
      <main>
        <div className={Styles.grid_container2}>
          <div className={Styles.item_B2}>
            <ResearchBar />
          </div>
          <div className={Styles.item_D2}>
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
              <InfinitePosts posts={posts} userId={user.id} />
            </InfiniteScroll>
          </div>
        </div>
      </main>
      <footer>
        <CreatePostModal />
      </footer>
    </ProtectRoute>
  );
}
