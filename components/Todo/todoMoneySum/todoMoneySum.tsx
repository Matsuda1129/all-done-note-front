import React, { useEffect, useState } from 'react';
import { todosRepository } from '../../../repositories';
import Styles from './todoMoneySum.module.css';

export default function TodoMoneySum({ userId, genre, group }) {
  const [sumMoney, setSumMoney] = useState(String);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const listData: any = await todosRepository.findLists(
          userId,
          group,
          genre
        );
        let money: number = 0;
        for (let i = 0; i < listData.length; i++) {
          money = money + listData[i].money;
          const moneyConma = money.toLocaleString();
          setSumMoney(moneyConma);
        }
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [genre, group, userId]);

  if (sumMoney === '0') {
    return null;
  } else {
    return (
      <div>
        <div className={Styles.list_title}>
          <div className={Styles.listname}>
            {genre} ¥{sumMoney}
          </div>
        </div>
      </div>
    );
  }
}
