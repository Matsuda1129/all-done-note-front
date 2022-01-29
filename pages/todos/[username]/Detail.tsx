import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Layout } from '../../../components/Home';
import { usersRepository } from '../../../repositories';
import { todosService } from '../../../services';
import Styles from '../../../styles/todo/todosDetail.module.css';

export default function Detail() {
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const [preparationPercent, setPreparationPercent] = useState(Number);
  const [todoPercent, setTodoPercent] = useState(Number);
  const [moneyPercent, setMoneyPercent] = useState(Number);
  const [allPercent, setAllPercent] = useState(Number);
  useEffect(() => {
    if (router.asPath !== router.route) {
      setUsername(String(router.query.username));
    }
  }, [router]);

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

          await setPreparationPercent(preparationPercentData);
          await setMoneyPercent(moneyPercentData);
          await setTodoPercent(todoPercentData);

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
      <link
        rel='stylesheet'
        href='https://cdn.rawgit.com/theus/chart.css/v1.0.0/dist/chart.css'
      />

      <div>
        {username}の
        <Link href={`../../todos/${username}`}>
          <a href=''>リストへ</a>
        </Link>
      </div>

      <table className={`charts column ${Styles.table}`}>
        <thead>
          <tr>
            <th scope='col' className={Styles.table_col1}>
              項目
            </th>
            <th scope='col' className={Styles.table_col2}>
              達成率
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope='row'> 総額 </th>
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
    </Layout>
  );
}
