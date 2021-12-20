import usersStyles from '../../styles/users.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProtectRoute } from '../../components/protectRouter';
import Header from '../../components/header/header';
import Button from '../../components/utils/button';
import InfinitePosts from '../../components/utils/infinitePosts';
import CreatePostModal from '../../components/createPostModal';
import InfiniteScroll from 'react-infinite-scroll-component';
import ModalProfile from '../../components/editProfileModal';
import InfiniteLikes from '../../components/utils/infiniteLikes';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { reset } from '../../redux/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { findOneUser } from '../../repositories/users';
import { fetchPosts, findPage1 } from '../../repositories/posts';
import { logout } from '../../services/users';

type user = {
  id: number;
  name: string;
  email: string;
  introduction: string;
};

export default function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const [profileModal, setProfileModal] = useState(false);
  const [checkUser, setCheckUser] = useState(false);
  const [username, setUsername] = useState<string>();
  const [user, setUser] = useState<user>({
    id: 0,
    name: '',
    email: '',
    introduction: '',
  });
  const [posts, setPostsData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  useEffect(() => {
    if (router.asPath !== router.route) {
      setUsername(String(router.query.username));
    }
  }, [router]);

  useEffect(() => {
    if (username) {
      const firstFetch = async () => {
        const page1 = await findPage1();
        const userData: user = await findOneUser(username);
        await setPostsData(page1);
        await setUser(userData);
        if (userData.id === loginUser.id) {
          await setCheckUser(true);
        }
      };
      firstFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const showProfileModal = async () => {
    await setProfileModal(true);
  };

  const fetchData = async () => {
    const componentsFormServer = await fetchPosts(page);
    setPostsData([...posts, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  const onLogout = async () => {
    await dispatch(reset());
    await logout();
  };

  const underline = { borderBottom: 'solid 2px #00f' };
  const [tab, setTabs] = useState(1);
  const handleTabs1 = () => {
    setTabs(1);
  };
  const handleTabs2 = () => {
    setTabs(2);
  };
  const handleTabs3 = () => {
    setTabs(3);
  };

  return (
    <ProtectRoute>
      <header>
        <Header />
      </header>
      <main>
        <div className={usersStyles.grid_container}>
          <div className={usersStyles.item_A}>
            <div className={usersStyles.position_name}>
              <div className={usersStyles.iconTree}>
                <h1>{user.name}</h1>
              </div>
            </div>
          </div>
          <div className={usersStyles.item_B}>
            <ProfileBar
              showProfileModal={showProfileModal}
              checkUser={checkUser}
            />
          </div>
          <div className={usersStyles.item_C}>
            <div className={usersStyles.content}>{user.introduction}</div>
          </div>
          <div className={usersStyles.item_D}>
            <div className={usersStyles.flex_container_under}>
              <div>フォロー中</div>
              <div>フォロワー</div>
              <Alive checkUser={checkUser} />
              <Logout checkUser={checkUser} logout={onLogout} />
            </div>
          </div>
          <div className={usersStyles.item_E}>
            <Tabs>
              <TabList className={usersStyles.tab_wrap}>
                <Tab onClick={handleTabs1} style={tab === 1 ? underline : null}>
                  投稿
                </Tab>
                <Tab onClick={handleTabs2} style={tab === 2 ? underline : null}>
                  いいね
                </Tab>
                <Tab onClick={handleTabs3} style={tab === 3 ? underline : null}>
                  目標
                </Tab>
              </TabList>

              <TabPanel>
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
                  <InfinitePosts posts={posts} />
                </InfiniteScroll>
              </TabPanel>
              <TabPanel>
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
                  <InfiniteLikes posts={posts} userId={user.id} />
                </InfiniteScroll>
              </TabPanel>
              <TabPanel>
                <h2>Any content 3</h2>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </main>

      <footer>
        <ModalProfile
          profileModal={profileModal}
          setProfileModal={setProfileModal}
          setUser={setUser}
        />
        <CreatePostModal />
      </footer>
    </ProtectRoute>
  );
}

const ProfileBar = (props) => {
  if (!props.checkUser) {
    return null;
  } else {
    return (
      <div className={usersStyles.flex_container_up}>
        <Button
          onClick={props.showProfileModal}
          className={usersStyles.item_up2}
        >
          プロフィール編集
        </Button>
        <div className={usersStyles.iconWill}>
          <Button className={usersStyles.item_up}>遺書</Button>
        </div>
        <div className={usersStyles.iconMovie}>
          <Button className={usersStyles.item_up}>動画</Button>
        </div>
      </div>
    );
  }
};

const Alive = (props) => {
  if (!props.checkUser) {
    return null;
  } else {
    return <Button className={usersStyles.alive}>alive</Button>;
  }
};

const Logout = (props) => {
  if (!props.checkUser) {
    return null;
  } else {
    return <Button onClick={props.logout}>ログアウト</Button>;
  }
};
