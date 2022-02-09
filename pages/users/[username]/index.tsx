import Styles from '../../../styles/users/users.module.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Image from 'next/image';
import { Layout } from '../../../components/Home';
import { CountFollower, CountFollowing } from '../../../components/parts';
import {
  Alive,
  EditProfileModal,
  Logout,
  MyGoodPosts,
  MyPosts,
  ProfileBar,
} from '../../../components/MyPage';
import { usersRepository } from '../../../repositories';
import { setFalse } from '../../../redux/isUseEffect';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import { todosService } from '../../../services';

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
  const [preparationPercent, setPreparationPercent] = useState(Number);
  const [todoPercent, setTodoPercent] = useState(Number);
  const [moneyPercent, setMoneyPercent] = useState(Number);
  const [allPercent, setAllPercent] = useState(Number);
  const [goalMoneyPercent1, setGoalMoneyPercent1] = useState(Number);
  const [goalMoneyPercent2, setGoalMoneyPercent2] = useState(Number);
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

  useEffect(() => {
    if (username) {
      const firstFetch = async () => {
        try {
          const userData: any = await usersRepository.find(username);
          const preparationPercentData = await todosService.findTodoPercent(
            userData.id,
            '準備'
          );
          const moneyPercentData = await todosService.findTodoPercent(
            userData.id,
            'お金'
          );
          const todoPercentData = await todosService.findTodoPercent(
            userData.id,
            'やりたいこと'
          );

          const todoPercentMoney1 = await todosService.findTodoMoneyPercent1(
            userData.id
          );
          const todoPercentMoneyPercent1 = await Math.floor(
            (userData.savings / todoPercentMoney1) * 100
          );

          const todoPercentMoney2 = await todosService.findTodoMoneyPercent2(
            userData.id
          );

          const todoPercentMoneyPercent2 = await Math.floor(
            (userData.savings / todoPercentMoney2) * 100
          );

          await setPreparationPercent(preparationPercentData);
          await setMoneyPercent(moneyPercentData);
          await setTodoPercent(todoPercentData);

          if (todoPercentMoneyPercent1 > 100) {
            await setGoalMoneyPercent1(100);
          } else {
            await setGoalMoneyPercent1(todoPercentMoneyPercent1);
          }

          if (todoPercentMoneyPercent2 > 100) {
            await setGoalMoneyPercent2(100);
          } else {
            await setGoalMoneyPercent2(todoPercentMoneyPercent2);
          }

          const allPercentData = Math.round(
            (moneyPercentData + preparationPercentData + todoPercentData) / 3
          );

          await setAllPercent(allPercentData);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [username]);

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
          <link
            rel='stylesheet'
            href='https://cdn.rawgit.com/theus/chart.css/v1.0.0/dist/chart.css'
          />

          <table className={`charts column ${Styles.table}`}>
            <thead>
              <tr>
                <th scope='col' className={Styles.table_col1}>
                  項目
                </th>
                <th scope='col' className={Styles.table_col2}>
                  目標金額達成率
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope='row'> 目標金額１ </th>
                <div
                  className={`charts__chart chart--p${goalMoneyPercent1} chart--grey ${Styles.chart_height}`}
                  data-percent
                ></div>
              </tr>
              <tr>
                <th scope='row'> 目標金額２ </th>
                <div
                  className={`charts__chart chart--p${goalMoneyPercent2} chart--blue ${Styles.chart_height}`}
                  data-percent
                ></div>
              </tr>
            </tbody>
          </table>

          <table className={`charts column ${Styles.table}`}>
            <thead>
              <tr>
                <th scope='col' className={Styles.table_col1}>
                  項目
                </th>
                <th scope='col' className={Styles.table_col2}>
                  完了達成率
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope='row'> 全体 </th>
                <div
                  className={`charts__chart chart--p${allPercent} chart--grey ${Styles.chart_height}`}
                  data-percent
                ></div>
              </tr>
              <tr>
                <th scope='row'> 準備 </th>
                <div
                  className={`charts__chart chart--p${preparationPercent} chart--blue ${Styles.chart_height}`}
                  data-percent
                ></div>
              </tr>
              <tr>
                <th scope='row'> 生涯費用 </th>
                <div
                  className={`charts__chart chart--p${moneyPercent} chart--yellow ${Styles.chart_height}`}
                  data-percent
                ></div>
              </tr>
              <tr>
                <th scope='row'> やりたいこと </th>
                <div
                  className={`charts__chart chart--p${todoPercent} chart--green ${Styles.chart_height}`}
                  data-percent
                ></div>
              </tr>
            </tbody>
          </table>
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
