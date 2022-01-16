import Styles from '../styles/home.module.css';
import { setUsers } from '../redux/usersSlice';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { ProtectRoute } from '../components/Home/protectRouter/protectRouter';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchPosts, fetchSearchedPosts } from '../repositories/posts';
import { findLoginUser } from '../repositories/users';
import {
  CreatePostModal,
  Header,
  InfinitePosts,
  ResearchBar,
  ResearchedBar,
} from '../components/Home';

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  const [checkedSearch, setCheckedSearch] = useState(false);
  const [searchWord, setSearchWord] = useState();
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchHasMore, setSearchHasMore] = useState(true);
  const [searchPage, setSearchPage] = useState(2);
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const page1 = await fetchPosts(1);
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

  const fetchSearchedData = async () => {
    const componentsFormServer = await fetchSearchedPosts(
      searchPage,
      searchWord
    );
    setSearchedPosts([...searchedPosts, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setSearchHasMore(false);
    }
    setSearchPage(searchPage + 1);
  };

  {
    if (checkedSearch === false) {
      return (
        <ProtectRoute>
          <header>
            <Header />
          </header>
          <main>
            <div className={Styles.grid_container}>
              <div className={Styles.item_B}>
                <ResearchBar
                  searchWord={searchWord}
                  setSearchWord={setSearchWord}
                  setCheckedSearch={setCheckedSearch}
                  setSearchedPosts={setSearchedPosts}
                  setSearchPage={setSearchPage}
                  setSearchHasMore={setSearchHasMore}
                />
              </div>
              <div className={Styles.item_D}>
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
    } else {
      return (
        <ProtectRoute>
          <header>
            <Header />
          </header>
          <main>
            <div className={Styles.grid_container}>
              <div className={Styles.item_B}>
                <ResearchedBar
                  searchWord={searchWord}
                  setSearchWord={setSearchWord}
                  setCheckedSearch={setCheckedSearch}
                  setSearchedPosts={setSearchedPosts}
                  setSearchPage={setSearchPage}
                  setSearchHasMore={setSearchHasMore}
                />
              </div>
              <div className={Styles.item_D}>
                <InfiniteScroll
                  dataLength={searchedPosts.length}
                  next={fetchSearchedData}
                  hasMore={searchHasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  <InfinitePosts posts={searchedPosts} userId={user.id} />
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
  }
}
