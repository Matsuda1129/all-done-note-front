import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Styles from '../../../styles/todo/todosLists.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button } from '../../../components/utils';
import {
  CreateTodoModal,
  TodoGenreList,
  TodoMoneySum,
  TodoSearchBar,
} from '../../../components/Todo';
import { Layout } from '../../../components/Home';
import { todosService } from '../../../services';
import { setFalse } from '../../../redux/isUseEffect';
import { todosRepository, usersRepository } from '../../../repositories';
import {
  setSearchBarMoneyFinish,
  setSearchBarMoneyGenre,
  setSearchBarMoneyUnFinish,
  setSearchBarPreparationFinish,
  setSearchBarPreparationGenre,
  setSearchBarPreparationUnFinish,
  setSearchBarTodoFinish,
  setSearchBarTodoGenre,
  setSearchBarTodoUnFinish,
} from '../../../redux/todos/todoSearchBarSlice';
import { changeOpenData } from '../../../redux/todos/openDataSlice';
import { changeLoignUserCheck } from '../../../redux/loginUserCheckSlice';
import { backfaceFixed } from '../../../lib/backFaceFixed';

export default function Todo() {
  const dispatch = useDispatch();
  const openData = useSelector((state: RootState) => state.openData.open);
  const loginUser = useSelector((state: RootState) => state.users.user);
  const loginUserCheck = useSelector(
    (state: RootState) => state.loginUserCheck.loginUserCheck
  );
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );

  const SearchBarTodoState = useSelector(
    (state: RootState) => state.todoSearchBar.todoSearchBar
  );
  const SearchBarMoneyState = useSelector(
    (state: RootState) => state.todoSearchBar.moneySearchBar
  );
  const SearchBarPreparationState = useSelector(
    (state: RootState) => state.todoSearchBar.preparationSearchBar
  );
  const router = useRouter();
  const [username, setUsername] = useState<string>();

  type user = {
    id: number;
  };
  const [user, setUser] = useState<user>({ id: null });
  const [genresMoney, setGenresMoney] = useState([]);
  const [genresPreparation, setGenresPreparation] = useState([]);
  const [genresTodo, setGenresTodo] = useState([]);
  const [moneySumMoney, setMoneySumMoney] = useState();
  const [preparationSumMoney, setPreparationSumMoney] = useState();
  const [todoSumMoney, setTodoSumMoney] = useState();
  const [allSumMoney, setAllSumMoney] = useState();
  const [createTodoModal, setCreateTodoModal] = useState(false);
  useEffect(() => {
    if (router.asPath !== router.route) {
      setUsername(String(router.query.username));
    }
  }, [router]);

  useEffect(() => {
    if (username) {
      const firstFetch = async () => {
        try {
          const res = await todosService.checkOpenData(username, loginUser.id);
          await dispatch(changeOpenData(res));
          const userData: any = await usersRepository.find(username);
          await setUser(userData);

          if (loginUser.id === userData.id) {
            await dispatch(changeLoignUserCheck(true));
          } else {
            await dispatch(changeLoignUserCheck(false));
          }
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [dispatch, loginUser.id, username]);

  const sumMoney = async (group, setState) => {
    const moneyData: any = await todosRepository.findUserGroup(
      loginUser.id,
      group
    );
    let sumMoney = 0;
    for (let i = 0; i < moneyData.length; i++) {
      sumMoney += moneyData[i].money;
    }
    const moneyConma = sumMoney.toLocaleString();
    setState(moneyConma);

    return sumMoney;
  };

  useEffect(() => {
    if (user.id !== null) {
      const firstFetch = async () => {
        try {
          await dispatch(setFalse());

          const money1 = await sumMoney('お金', setMoneySumMoney);
          const money2 = await sumMoney('準備', setPreparationSumMoney);
          const money3 = await sumMoney('やりたいこと', setTodoSumMoney);

          const sumMoney123 = money1 + money2 + money3;
          const moneyConma: any = sumMoney123.toLocaleString();
          await setAllSumMoney(moneyConma);

          const moneyGenresData = await todosService.findUserGenre(
            user.id,
            'お金'
          );
          await setGenresMoney(moneyGenresData);
          const preparationGenresData = await todosService.findUserGenre(
            user.id,
            '準備'
          );
          await setGenresPreparation(preparationGenresData);
          const todoGenresData = await todosService.findUserGenre(
            user.id,
            'やりたいこと'
          );
          await setGenresTodo(todoGenresData);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isUseEffect, user, username]);

  useEffect(() => {
    if (user.id === loginUser.id) {
      const firstFetch = async () => {
        try {
          const alltodoPercent = await todosService.findTodoAllPercent(
            username
          );
          await usersRepository.editTodo(user.id, alltodoPercent);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [loginUser.id, user.id, username, isUseEffect]);

  const openCreateTodoModal = async () => {
    if (createTodoModal) {
      await setCreateTodoModal(false);
      await backfaceFixed(false);
      await dispatch(setFalse());
    } else {
      await setCreateTodoModal(true);
      await backfaceFixed(true);
    }
  };

  const underline = {
    borderBottom: 'solid 2px #00f',
  };
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
  const handleTabs4 = () => {
    setTabs(4);
  };

  return (
    <div>
      <Layout>
        {openData ? (
          <Tabs>
            <TabList className={Styles.tab_wrap}>
              <Tab
                className={Styles.tab_margin}
                onClick={handleTabs1}
                style={tab === 1 ? underline : null}
              >
                準備
              </Tab>
              <Tab
                className={Styles.tab_margin}
                onClick={handleTabs2}
                style={tab === 2 ? underline : null}
              >
                生涯費用
              </Tab>
              <Tab
                className={Styles.tab_margin}
                onClick={handleTabs3}
                style={tab === 3 ? underline : null}
              >
                やりたいこと
              </Tab>
              <Tab
                className={Styles.tab_margin}
                onClick={handleTabs4}
                style={tab === 4 ? underline : null}
              >
                総額
              </Tab>
              {loginUserCheck ? (
                <div className={Styles.createBtn}>
                  <Button onClick={openCreateTodoModal}>作成</Button>
                </div>
              ) : null}
            </TabList>

            <TabPanel>
              <TodoSearchBar
                genres={genresPreparation}
                setSearchBarFinish={setSearchBarPreparationFinish}
                setSearchBarUnFinish={setSearchBarPreparationUnFinish}
                setSearchGenre={setSearchBarPreparationGenre}
                searchBarState={SearchBarPreparationState}
              />
              {genresPreparation.map((genre) => {
                return (
                  <div key={genre}>
                    <TodoGenreList
                      searchBarState={SearchBarPreparationState}
                      userId={user.id}
                      genre={genre}
                      group={'準備'}
                    />
                  </div>
                );
              })}
              <div className={Styles.border}></div>
            </TabPanel>
            <TabPanel>
              <TodoSearchBar
                searchBarState={SearchBarMoneyState}
                genres={genresMoney}
                setSearchBarFinish={setSearchBarMoneyFinish}
                setSearchBarUnFinish={setSearchBarMoneyUnFinish}
                setSearchGenre={setSearchBarMoneyGenre}
              />
              {genresMoney.map((genre) => {
                return (
                  <div key={genre}>
                    <TodoGenreList
                      searchBarState={SearchBarMoneyState}
                      userId={user.id}
                      genre={genre}
                      group={'お金'}
                    />
                  </div>
                );
              })}
              <div className={Styles.border}></div>
            </TabPanel>
            <TabPanel>
              <TodoSearchBar
                setSearchBarFinish={setSearchBarTodoFinish}
                setSearchBarUnFinish={setSearchBarTodoUnFinish}
                setSearchGenre={setSearchBarTodoGenre}
                genres={genresTodo}
                searchBarState={SearchBarTodoState}
              />
              {genresTodo.map((genre) => {
                return (
                  <div key={genre}>
                    <TodoGenreList
                      searchBarState={SearchBarTodoState}
                      userId={user.id}
                      genre={genre}
                      group={'やりたいこと'}
                    />
                  </div>
                );
              })}
              <div className={Styles.border}></div>
            </TabPanel>
            <TabPanel>
              <div className={Styles.goalMoney_title}>
                目標額１(準備) ¥{preparationSumMoney}
              </div>
              <div></div>
              <div className={Styles.goalMoney_title}>
                目標額２(準備 + 生涯費用 + やりたいこと) ¥{allSumMoney}
              </div>
              <div className={Styles.genre_title}>
                準備 ¥{preparationSumMoney}
              </div>
              {genresPreparation.map((genre) => {
                return (
                  <TodoMoneySum
                    genre={genre}
                    key={genre}
                    group={'準備'}
                    userId={user.id}
                  />
                );
              })}
              <div className={Styles.genre_title}>
                生涯費用 ¥{moneySumMoney}
              </div>
              {genresMoney.map((genre) => {
                return (
                  <TodoMoneySum
                    genre={genre}
                    key={genre}
                    group={'お金'}
                    userId={user.id}
                  />
                );
              })}
              <div className={Styles.genre_title}>
                やりたいこと ¥{todoSumMoney}
              </div>
              {genresTodo.map((genre) => {
                return (
                  <TodoMoneySum
                    genre={genre}
                    key={genre}
                    group={'やりたいこと'}
                    userId={user.id}
                  />
                );
              })}
              <div className={Styles.border}></div>
            </TabPanel>
          </Tabs>
        ) : (
          <div className={Styles.middle}>
            {username}はデータを非公開にしています
          </div>
        )}
      </Layout>

      <footer>
        <CreateTodoModal
          createTodoModal={createTodoModal}
          openCreateTodoModal={openCreateTodoModal}
        />
      </footer>
    </div>
  );
}
