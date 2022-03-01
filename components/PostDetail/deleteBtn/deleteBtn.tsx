import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrue } from '../../../redux/isUseEffect';
import { RootState } from '../../../redux/store';
import { commentRepository } from '../../../repositories';
import Styles from './deleteBtn.module.css';

export default function DeleteBtn({ comment }) {
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const deleteComment = async () => {
    let result = await confirm('削除しますか？');

    if (result) {
      await commentRepository.deleteOne(comment.id);
      await dispatch(setTrue());
    }
  };

  if (loginUser.id === comment.userId) {
    return (
      <div>
        <button className={Styles.delete_btn} onClick={deleteComment}>
          削除する
        </button>
      </div>
    );
  } else {
    return null;
  }
}
