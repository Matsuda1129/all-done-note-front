import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { todosService } from '../../../services';
import Styles from './todoCharts.module.css';

export default function TodoCharts({ username }) {
  const [preparationPercent, setPreparationPercent] = useState(Number);
  const [todoPercent, setTodoPercent] = useState(Number);
  const [moneyPercent, setMoneyPercent] = useState(Number);
  const [allPercent, setAllPercent] = useState(Number);
  const [goalMoneyPercent1, setGoalMoneyPercent1] = useState(Number);
  const [goalMoneyPercent2, setGoalMoneyPercent2] = useState(Number);
  useEffect(() => {
    if (username) {
      const firstFetch = async () => {
        try {
          const data = await todosService.findTodoAllPercent(username);
          await setGoalMoneyPercent1(data.goalMoneyPercent1);
          await setGoalMoneyPercent2(data.goalMoneyPercent2);
          await setAllPercent(data.allPercentData);
          await setPreparationPercent(data.preparationPercentData);
          await setMoneyPercent(data.moneyPercentData);
          await setTodoPercent(data.todoPercentData);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [username]);

  return (
    <div>
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
    </div>
  );
}
