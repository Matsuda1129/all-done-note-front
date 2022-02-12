import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../../components/Home';
import { RootState } from '../../../redux/store';
import { usersRepository } from '../../../repositories';
import { todosService } from '../../../services';
import Styles from '../../../styles/todo/todos.module.css';

export default function Detail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const openData = useSelector((state: RootState) => state.openData.open);
  const [checkOpenData, setCheckOpenData] = useState(Boolean);
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
          // const userData: any = await usersRepository.find(username);
          // if (userData.id === loginUser.id) {
          //   setCheckOpenData(true);
          // } else if (userData.alive) {
          //   if (userData.openData) {
          //     await setCheckOpenData(true);
          //   } else {
          //     setCheckOpenData(false);
          //   }
          // } else if (!userData.alive) {
          //   if (userData.openDataAfterDie) {
          //     setCheckOpenData(true);
          //   } else {
          //     setCheckOpenData(false);
          //   }
          // }
          const res = await todosService.checkOpenData(username, loginUser.id);
          await dispatch(() => setCheckOpenData(res));
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [dispatch, loginUser.id, username]);

  useEffect(() => {
    if (username) {
      const firstFetch = async () => {
        try {
          const data = await todosService.findTodoAllPercent(username);
          await setGoalMoneyPercent1(data[0]);
          await setGoalMoneyPercent2(data[1]);
          await setAllPercent(data[2]);
          await setPreparationPercent(data[3]);
          await setMoneyPercent(data[4]);
          await setTodoPercent(data[5]);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [username]);

  return (
    <Layout>
      {checkOpenData ? (
        <div>
          <link
            rel='stylesheet'
            href='https://cdn.rawgit.com/theus/chart.css/v1.0.0/dist/chart.css'
          />

          <Link href={`../../todos/${username}/lists`}>
            <a href='' className={Styles.listhe_position}>
              {username}のリストへ
            </a>
          </Link>

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
        </div>
      ) : (
        <div className={Styles.middle}>
          {username}はデータを非公開にしています
        </div>
      )}
    </Layout>
  );
}
