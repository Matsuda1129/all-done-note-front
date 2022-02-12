import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTrue } from '../../../../redux/isUseEffect';
import { todosRepository } from '../../../../repositories';
import EditTodoModal from './parts/editTodoModal/editTodoModal';
import MoneyModal from './parts/moneyModal/moneyModal';
import Styles from './todoLists.module.css';

export default function TodoLists({ list, userId }) {
  const dispatch = useDispatch();
  const [moneyModal, setMoneyModal] = useState(false);
  const [editTodoModal, setEditTodoModal] = useState(false);
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        await setFinish(list.finished);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [list.finished]);

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
    } else {
      await setEditTodoModal(true);
    }
  };

  const changeFinish = async (list) => {
    if (finish) {
      await todosRepository.changeTodoFinish(list, false);
      await setFinish(false);
      await dispatch(setTrue());
    } else {
      await todosRepository.changeTodoFinish(list, true);
      await setFinish(true);
      await dispatch(setTrue());
    }
  };

  const deleteList = async (id) => {
    const check = confirm('削除してもいいですか？');

    if (check) {
      await todosRepository.deleteTodo(id);
      await dispatch(setTrue());
    }
  };

  return (
    <div className={Styles.list_title}>
      <input
        className={Styles.checkbox}
        type='checkbox'
        checked={finish}
        onChange={() => changeFinish(list)}
      />
      <Listname list={list} finish={finish} />
      <div className={Styles.editBar}>
        <button className={Styles.iconLock} />
        <button className={Styles.iconMoney} onClick={() => openMoneyModal()} />
        <button
          className={Styles.iconMemo}
          onClick={() => openEditTodoModal()}
        />
        <button className={Styles.batsu} onClick={() => deleteList(list.id)}>
          ×
        </button>
      </div>
      <MoneyModal
        openMoneyModal={openMoneyModal}
        moneyModal={moneyModal}
        list={list}
        />
      <EditTodoModal
        list={list}
        openEditTodoModal={openEditTodoModal}
        editTodoModal={editTodoModal}
        userId={userId}
      />
    </div>
  );
}

const Listname = ({ finish, list }) => {
  if (!finish) {
    return (
      <div className={Styles.listname}>
        <span className={Styles.span}>{list.listname}</span>
      </div>
    );
  } else {
    return (
      <div className={Styles.listname_finish}>
        <span className={Styles.span}>{list.listname}</span>
      </div>
    );
  }
};
