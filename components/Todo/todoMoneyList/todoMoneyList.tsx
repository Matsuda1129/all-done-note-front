import React, { useEffect, useState } from 'react';
import { findLists } from '../../../repositories/todos';
import Styles from './todoMoneyList.module.css';

export default function TodoMoneyList(props) {
  const [lists, setList] = useState([]);
  const [sumMoney, setSumMoney] = useState(Number);
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const listData: any = await findLists(
          props.userId,
          props.group,
          props.genre
        );
        await setList(listData);
        let money: number = 0;
        for (let i = 0; i < lists.length; i++) {
          money = money + lists[i].money;
          setSumMoney(money);
        }
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [lists.length, props.genre, props.group, props.userId]);

  useEffect(() => {
    if (props.isUseEffect === false) {
      const firstFetch = async () => {
        try {
          const listData: any = await findLists(
            props.userId,
            props.group,
            props.genre
          );
          await setList(listData);
          let money: number = 0;
          for (let i = 0; i < lists.length; i++) {
            money = money + lists[i].money;
            setSumMoney(money);
          }
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [lists.length, props.genre, props.group, props.isUseEffect, props.userId]);

  return (
    <div>
      <div className={Styles.list_title}>
        <div className={Styles.listname}>
          <span className={Styles.span}>
            {props.genre} {sumMoney}
          </span>
        </div>
      </div>
    </div>
  );
}
