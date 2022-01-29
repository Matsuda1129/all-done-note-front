import Styles from '../../styles/users.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Image from 'next/image';
import { Layout } from '../../components/Home';
import { CountFollower, CountFollowing } from '../../components/parts';
import {
  Alive,
  EditProfileModal,
  Logout,
  MyGoodPosts,
  MyPosts,
  ProfileBar,
} from '../../components/MyPage';
import { usersRepository } from '../../repositories';
import { setFalse } from '../../redux/isUseEffect';

type user = {
  id: number;
  name: string;
  email: string;
  introduction: string;
  picture: string;
};

export default function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );
  const [profileModal, setProfileModal] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [username, setUsername] = useState<string>();
  const [user, setUser] = useState<user>({
    id: 0,
    name: '',
    email: '',
    introduction: '',
    picture: '',
  });

  useEffect(() => {
    if (router.asPath !== router.route) {
      setUsername(String(router.query.username));
    }
  }, [router]);

  useEffect(() => {
    if (username) {
      const firstFetch = async () => {
        try {
          const userData: user = await usersRepository.find(username);
          await setUser(userData);
          if (userData.id === loginUser.id) {
            await setCheckLogin(true);
          } else {
            await setCheckLogin(false);
          }
          await dispatch(setFalse());
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [dispatch, isUseEffect, loginUser.id, user.id, username]);

  const showProfileModal = async () => {
    await setProfileModal(true);
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
    <Layout>
      <div className={Styles.flex_container}>
        <div className={Styles.position_nameBar}>
          <div className={Styles.flex_container}>
            <Image
              className={Styles.triming}
              priority
              src={process.env.NEXT_PUBLIC_IMAGE_URL + user.picture}
              height={50}
              width={100}
              alt={'アイコン'}
            />
            <h1 className={Styles.name}>{user.name}</h1>
          </div>
        </div>
          <ProfileBar
            userId={user.id}
            showProfileModal={showProfileModal}
            checkLogin={checkLogin}
          />
      </div>
      <div className={Styles.introduction}>{user.introduction}</div>
      <div className={Styles.flex_container_under}>
        <CountFollowing userId={user.id} />
        <CountFollower userId={user.id} />
        <Alive checkLogin={checkLogin} />
        <Logout checkLogin={checkLogin} />
      </div>
      <Tabs>
        <TabList className={Styles.tab_wrap}>
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
          <MyPosts userId={user.id} />
        </TabPanel>
        <TabPanel>
          <MyGoodPosts userId={user.id} />
        </TabPanel>
        <TabPanel>
          <h2>Any content 3</h2>
        </TabPanel>
      </Tabs>

      <footer>
        <EditProfileModal
          profileModal={profileModal}
          setProfileModal={setProfileModal}
          setUser={setUser}
        />
      </footer>
    </Layout>
  );
}
