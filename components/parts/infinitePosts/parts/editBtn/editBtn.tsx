import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrue } from '../../../../../redux/isUseEffect';
import { RootState } from '../../../../../redux/store';
import { postsRepository } from '../../../../../repositories';
import EditPostModal from './editPostModal/editPostModal';
import Styles from './editBtn.module.css';
import { backfaceFixed } from '../../../../../lib/backFaceFixed';

export default function EditBtn({ post }) {
  const loginUser = useSelector((state: RootState) => state.users.user);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const showModal = async () => {
    if (modal) {
      await dispatch(setTrue());
      await backfaceFixed(false);
      setModal(false);
    } else {
      await backfaceFixed(true);
      setModal(true);
    }
  };
  const deletePost = async () => {
    let result = await confirm('削除しますか？');
    if (result) {
      await postsRepository.deleteOne(post.id);
      await dispatch(setTrue());
    }
  };

  if (loginUser.id === post.user.id) {
    return (
      <div className={Styles.flex_container}>
        <button className={Styles.delete_btn} onClick={deletePost}>
          削除する
        </button>
        <button className={Styles.delete_btn} onClick={showModal}>
          編集する
        </button>
        <EditPostModal modal={modal} showModal={showModal} post={post} />
      </div>
    );
  } else {
    return null;
  }
}
