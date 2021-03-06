import Styles from '../../../styles/users/users.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Image from 'next/image';
import { Layout } from '../../../components/Home';
import {
  CountFollower,
  CountFollowing,
  TodoCharts,
} from '../../../components/parts';
import {
  Alive,
  AliveModal,
  EditProfileModal,
  Logout,
  MyGoodPosts,
  MyPosts,
  ProfileBar,
  WillModal,
} from '../../../components/MyPage';
import { usersRepository } from '../../../repositories';
import { setFalse } from '../../../redux/isUseEffect';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import { todosService } from '../../../services';
import { changeOpenData } from '../../../redux/todos/openDataSlice';
import Link from 'next/link';

type user = {
  id: number;
  name: string;
  email: string;
  introduction: string;
  icon: string;
};

export default function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const openData = useSelector((state: RootState) => state.openData.open);
  const loginUser = useSelector((state: RootState) => state.users.user);
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );
  const [profileModal, setProfileModal] = useState(false);
  const [willModal, setWillModal] = useState(false);
  const [aliveModal, setAliveModal] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [username, setUsername] = useState<string>();
  const [user, setUser] = useState<user>({
    id: 0,
    name: '',
    email: '',
    introduction: '',
    icon: '',
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

          const res = await todosService.checkOpenData(username, loginUser.id);
          await dispatch(changeOpenData(res));
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [dispatch, isUseEffect, loginUser.id, user.id, username]);

  const showProfileModal = async () => {
    await backfaceFixed(true);
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
          <div className={Styles.flex_user_container}>
            <Image
              className={Styles.triming}
              priority
              src={process.env.NEXT_PUBLIC_IMAGE_URL + user.icon}
              height={50}
              width={100}
              alt={'????????????'}
            />
            <h1 className={Styles.name}>{user.name}</h1>
          </div>
        </div>
        <div className={Styles.profileBar}>
          <ProfileBar
            userId={user.id}
            setWillModal={setWillModal}
            showProfileModal={showProfileModal}
            checkLogin={checkLogin}
          />
        </div>
      </div>
      <div className={Styles.introduction}>{user.introduction}</div>
      <div className={Styles.flex_container_under}>
        <CountFollowing userId={user.id} />
        <CountFollower userId={user.id} />
        <Alive checkLogin={checkLogin} setAliveModal={setAliveModal} />
        <Logout checkLogin={checkLogin} />
      </div>
      <Tabs>
        <TabList className={Styles.tab_wrap}>
          <Tab onClick={handleTabs1} style={tab === 1 ? underline : null}>
            ??????
          </Tab>
          <Tab onClick={handleTabs2} style={tab === 2 ? underline : null}>
            ?????????
          </Tab>
          <Tab onClick={handleTabs3} style={tab === 3 ? underline : null}>
            ??????
          </Tab>
        </TabList>

        <TabPanel>
          <MyPosts userId={user.id} />
        </TabPanel>
        <TabPanel>
          <MyGoodPosts userId={user.id} />
        </TabPanel>
        <TabPanel>
          {openData ? (
            <div>
              <Link href={`../../todos/${username}/lists`}>
                <a href='' className={Styles.listhe_position}>
                  {username}???????????????
                </a>
              </Link>
              <TodoCharts username={username} />
            </div>
          ) : (
            <div className={Styles.middle}>
              {username}??????????????????????????????????????????
            </div>
          )}
        </TabPanel>
      </Tabs>

      <footer>
        <EditProfileModal
          profileModal={profileModal}
          setProfileModal={setProfileModal}
          setUser={setUser}
        />
        <WillModal willModal={willModal} setWillModal={setWillModal} />
        <AliveModal aliveModal={aliveModal} setAliveModal={setAliveModal} />
      </footer>
    </Layout>
  );
}
