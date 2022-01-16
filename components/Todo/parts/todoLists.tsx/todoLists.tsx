import React, { useState } from 'react';
import { EditTodoModal, MoneyModal } from '../..';
import { changeTodoFinish, deleteTodo } from '../../../../repositories/todos';
import Styles from './todoLists.module.css';

export default function TodoLists(props) {
  const [moneyModal, setMoneyModal] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);
  const [finish, setFinish] = useState(false);

  const openMoneyModal = async () => {
    if (moneyModal) {
      await setMoneyModal(false);
    } else {
      await setMoneyModal(true);
    }
  };

  const openEditTodoModal = async () => {
    if (editTodoModal) {
      await setEditTodoModal(false);
      await props.setIsUseEffect(false);
    } else {
      await setEditTodoModal(true);
    }
  };

  const changeFinish = async (props) => {
    if (finish) {
      const boolean = false;
      await setFinish(false);
      await changeTodoFinish(props.list, boolean);
      await props.setIsUseEffect(false);
    } else {
      const boolean = true;
      await changeTodoFinish(props.list, boolean);
      await setFinish(true);
    }
  };

  const deleteList = async (id) => {
    const check = confirm('削除してもいいですか？');

    if (check) {
      await deleteTodo(id);
      await props.setIsUseEffect(false);
    }
  };

  return (
    <div className={Styles.list_title} key={props.list.id}>
      <input
        className={Styles.checkbox}
        type='checkbox'
        checked={finish}
        onClick={() => changeFinish(props.list)}
      />
      <Listname list={props.list} finish={finish} />
      <div className={Styles.editBar}>
        <button className={Styles.iconLock} />
        <button className={Styles.iconMoney} onClick={() => openMoneyModal()} />
        <button
          className={Styles.iconMemo}
          onClick={() => openEditTodoModal()}
        />
        <button
          className={Styles.batsu}
          onClick={() => deleteList(props.list.id)}
        >
          ×
        </button>
      </div>
      <MoneyModal
        openMoneyModal={openMoneyModal}
        moneyModal={moneyModal}
        list={props.list}
      />
      <EditTodoModal
        list={props.list}
        openEditTodoModal={openEditTodoModal}
        editTodoModal={editTodoModal}
      />
    </div>
  );
}

const Listname = (props) => {
  if (!props.finish) {
    return (
      <div className={Styles.listname}>
        <span className={Styles.span}>{props.list.listname}</span>
      </div>
    );
  } else {
    return (
      <div className={Styles.listname_finish}>
        <span className={Styles.span}>{props.list.listname}</span>
      </div>
    );
  }
};
