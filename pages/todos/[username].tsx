import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Styles from '../../styles/todos.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  findUserMoneyGenre,
  findUserPreparationGenre,
  findUserTodoGenre,
} from '../../services/todos';
import { Button } from '../../components/utils';
import { CreatePostModal, Header } from '../../components/Home';
import {
  CreateTodoModal,
  TodoGenreList,
  TodoMoneyList,
} from '../../components/Todo';

export default function Todo() {
  const loginUser = useSelector((state: RootState) => state.users.user);
  const [userId, setUserId] = useState(Number);
  const router = useRouter();
  const [isUseEffect, setIsUseEffect] = useState(false);
  const [username, setUsername] = useState<string>();
  const [genres1, setGenres1] = useState([]);
  const [genres2, setGenres2] = useState([]);
  const [genres3, setGenres3] = useState([]);
  const [createTodoModal, setCreateTodoModal] = useState(false);
  useEffect(() => {
    if (router.asPath !== router.route) {
      setUsername(String(router.query.username));
    }
  }, [router]);

  useEffect(() => {
    if (loginUser.id !== null) {
      setUserId(loginUser.id);
    }
  }, [loginUser.id, router]);
  console.log(userId);

  useEffect(() => {
    if (username || isUseEffect === false) {
      if (userId !== 0) {
        const firstFetch = async () => {
          console.log(userId);
          await setIsUseEffect(true);
          const moneyGenres = await findUserMoneyGenre(userId);
          await setGenres1(moneyGenres);
          const preparationGenres = await findUserPreparationGenre(userId);
          await setGenres2(preparationGenres);
          const todoGenres = await findUserTodoGenre(userId);
          await setGenres3(todoGenres);
        };
        firstFetch();
      }
    }
  }, [isUseEffect, loginUser.id, userId, username]);

  const openCreateTodoModal = async () => {
    if (createTodoModal) {
      await setCreateTodoModal(false);
      await setIsUseEffect(false);
    } else {
      await setCreateTodoModal(true);
    }
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
    <div>
      <header>
        <Header />
      </header>
      <main>
        <div className={Styles.grid_container}>
          <div className={Styles.item_A}>
            <Tabs>
              <TabList className={Styles.tab_wrap}>
                <Tab onClick={handleTabs1} style={tab === 1 ? underline : null}>
                  お金
                </Tab>
                <Tab onClick={handleTabs2} style={tab === 2 ? underline : null}>
                  準備
                </Tab>
                <Tab onClick={handleTabs3} style={tab === 3 ? underline : null}>
                  やりたいこと
                </Tab>
                <Button onClick={openCreateTodoModal}>作成</Button>
              </TabList>

              <TabPanel>
                {genres1.map((genre) => {
                  return (
                    <div key={genre}>
                      <div className={Styles.genre_title}>{genre}</div>
                      <TodoGenreList
                        userId={loginUser.id}
                        genre={genre}
                        group={'お金'}
                        isUseEffect={isUseEffect}
                        setIsUseEffect={setIsUseEffect}
                      />
                    </div>
                  );
                })}
                <div className={Styles.genre_title}>目標額１</div>
                {genres2.map((genre) => {
                  return (
                    <TodoMoneyList
                      genre={genre}
                      key={genre}
                      group={'準備'}
                      userId={loginUser.id}
                    />
                  );
                })}
                <div className={Styles.genre_title}>目標額２</div>
                {genres3.map((genre) => {
                  return (
                    <TodoMoneyList
                      genre={genre}
                      key={genre}
                      group={'やりたいこと'}
                      userId={loginUser.id}
                    />
                  );
                })}
              </TabPanel>
              <TabPanel>
                {genres2.map((genre) => {
                  return (
                    <div key={genre}>
                      <div className={Styles.genre_title}>{genre}</div>
                      <TodoGenreList
                        userId={loginUser.id}
                        genre={genre}
                        group={'準備'}
                        isUseEffect={isUseEffect}
                        setIsUseEffect={setIsUseEffect}
                      />
                    </div>
                  );
                })}
              </TabPanel>
              <TabPanel>
                {genres3.map((genre) => {
                  return (
                    <div key={genre}>
                      <div className={Styles.genre_title}>{genre}</div>
                      <TodoGenreList
                        userId={loginUser.id}
                        genre={genre}
                        group={'やりたいこと'}
                        isUseEffect={isUseEffect}
                        setIsUseEffect={setIsUseEffect}
                      />
                    </div>
                  );
                })}
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </main>

      <footer>
        <CreateTodoModal
          createTodoModal={createTodoModal}
          setCreateTodoModal={setCreateTodoModal}
          openCreateTodoModal={openCreateTodoModal}
        />
        <CreatePostModal />
      </footer>
    </div>
  );
}
