import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Home';
import Styles from '../styles/dataAnalist.module.css';
import { Chart, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { DataAnalistSearchBar } from '../components/DataAnalist';
import { dataAnalizeService } from '../services';

export default function DataAnalist() {
  const [preparationPercent, setPreparationPercent] = useState(Number);
  const [todoPercent, setTodoPercent] = useState(Number);
  const [moneyPercent, setMoneyPercent] = useState(Number);
  const [allPercent, setAllPercent] = useState(Number);
  const [goalMoneyPercent1, setGoalMoneyPercent1] = useState(Number);
  const [goalMoneyPercent2, setGoalMoneyPercent2] = useState(Number);

  const [gender, setGender] = useState(undefined);
  const [alive, setAlive] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [job, setJob] = useState(undefined);
  const [family, setFamily] = useState({
    alone: false,
    isMarried: false,
    isParents: false,
    isSpouseParents: false,
    isChild: false,
    isChildren2: false,
    isChildren3: false,
    isOthers: false,
  });
  const [familyModal, setFamilyModal] = useState(false);
  const [goalMoeny1Ratio, setGoalMoney1Ratio] = useState({
    zeroMillion: 0,
    tenMillion: 0,
    twentyMillion: 0,
    thirtyMillion: 0,
    fortyMillion: 0,
    fiftyMillion: 0,
    sixtyMillion: 0,
    seventyMillion: 0,
    eightyMillion: 0,
    ninetyMillion: 0,
  });
  const [goalMoeny2Ratio, setGoalMoney2Ratio] = useState({
    zeroMillion: 0,
    tenMillion: 0,
    twentyMillion: 0,
    thirtyMillion: 0,
    fortyMillion: 0,
    fiftyMillion: 0,
    sixtyMillion: 0,
    seventyMillion: 0,
    eightyMillion: 0,
    ninetyMillion: 0,
  });

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const data: any = await dataAnalizeService.analizedData(
          gender,
          age,
          job,
          alive,
          family
        );
        await setGoalMoney1Ratio(data.goalMoeny1Ratio);
        await setGoalMoney2Ratio(data.goalMoeny2Ratio);
        await setGoalMoneyPercent1(data.goalMoney1Percent);
        await setGoalMoneyPercent2(data.goalMoney2Percent);
        await setAllPercent(data.allPercent);
        await setPreparationPercent(data.preparationPercent);
        await setMoneyPercent(data.moneyPercent);
        await setTodoPercent(data.todoPercent);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [age, alive, family, gender, job]);

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const goalMoeny1RatioData = {
    // x ???????????????
    labels: [
      '1000?????????',
      '1000???',
      '2000???',
      '3000???',
      '4000???',
      '5000???',
      '6000???',
      '7000???',
      '8000???',
      '9000???',
    ],
    datasets: [
      {
        label: '??????????????? ??????',
        // ???????????????
        data: [
          goalMoeny1Ratio.zeroMillion,
          goalMoeny1Ratio.tenMillion,
          goalMoeny1Ratio.twentyMillion,
          goalMoeny1Ratio.thirtyMillion,
          goalMoeny1Ratio.fortyMillion,
          goalMoeny1Ratio.fiftyMillion,
          goalMoeny1Ratio.sixtyMillion,
          goalMoeny1Ratio.seventyMillion,
          goalMoeny1Ratio.eightyMillion,
          goalMoeny1Ratio.ninetyMillion,
        ],
        // ?????????????????????
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        // ????????????????????????
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        // ???????????????????????????
        borderWidth: 1,
      },
    ],
  };

  const goalMoeny2RatioData = {
    // x ???????????????
    labels: [
      '1000?????????',
      '1000???',
      '2000???',
      '3000???',
      '4000???',
      '5000???',
      '6000???',
      '7000???',
      '8000???',
      '9000???',
    ],
    datasets: [
      {
        label: '????????????2 ??????',
        // ???????????????
        data: [
          goalMoeny2Ratio.zeroMillion,
          goalMoeny2Ratio.tenMillion,
          goalMoeny2Ratio.twentyMillion,
          goalMoeny2Ratio.thirtyMillion,
          goalMoeny2Ratio.fortyMillion,
          goalMoeny2Ratio.fiftyMillion,
          goalMoeny2Ratio.sixtyMillion,
          goalMoeny2Ratio.seventyMillion,
          goalMoeny2Ratio.eightyMillion,
          goalMoeny2Ratio.ninetyMillion,
        ],
        // ?????????????????????
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        // ????????????????????????
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        // ???????????????????????????
        borderWidth: 1,
      },
    ],
  };

  return (
    <Layout>
      <h1 style={{ textAlign: 'center' }}>???????????????</h1>
      <div style={{ textAlign: 'center' }}>
        <DataAnalistSearchBar
          setAge={setAge}
          setAlive={setAlive}
          setFamily={setFamily}
          setGender={setGender}
          setJob={setJob}
          setFamilyModal={setFamilyModal}
          familyModal={familyModal}
        />
      </div>
      <br />
      <Bar data={goalMoeny1RatioData} className={Styles.Bar_charts} />
      <Bar data={goalMoeny2RatioData} className={Styles.Bar_charts} />

      <link
        rel='stylesheet'
        href='https://cdn.rawgit.com/theus/chart.css/v1.0.0/dist/chart.css'
      />

      <table className={`charts column ${Styles.table}`}>
        <thead>
          <tr>
            <th scope='col' className={Styles.table_col1}>
              ??????
            </th>
            <th scope='col' className={Styles.table_col2}>
              ?????????????????????
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope='row'> ??????????????? </th>
            <div
              className={`charts__chart chart--p${goalMoneyPercent1} chart--grey ${Styles.chart_height}`}
              data-percent
            ></div>
          </tr>
          <tr>
            <th scope='row'> ??????????????? </th>
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
              ??????
            </th>
            <th scope='col' className={Styles.table_col2}>
              ???????????????
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th scope='row'> ?????? </th>
            <div
              className={`charts__chart chart--p${allPercent} chart--grey ${Styles.chart_height}`}
              data-percent
            ></div>
          </tr>
          <tr>
            <th scope='row'> ?????? </th>
            <div
              className={`charts__chart chart--p${preparationPercent} chart--blue ${Styles.chart_height}`}
              data-percent
            ></div>
          </tr>
          <tr>
            <th scope='row'> ???????????? </th>
            <div
              className={`charts__chart chart--p${moneyPercent} chart--yellow ${Styles.chart_height}`}
              data-percent
            ></div>
          </tr>
          <tr>
            <th scope='row'> ?????????????????? </th>
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
