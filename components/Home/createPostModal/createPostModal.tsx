import router from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { setFalse } from '../../../redux/modalSlice';
import { createPost } from '../../../repositories/posts';
import Styles from './createPostModal.module.css';
import { Button } from '../../utils';

export default function CreatePostModal() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const modal = useSelector((state: RootState) => state.modalPost);
  const [content, setContent] = useState('');

  const sendPost = async () => {
    try {
      await dispatch(setFalse());
      await createPost(user.id, content);
      await alert('投稿しました');
      await router.push('/home');
    } catch (error) {
      alert('投稿できませんでした');
    }
  };
  if (modal.modalPost) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button
              className={Styles.batsu}
              onClick={() => dispatch(setFalse())}
            >
              ×
            </button>
            <textarea
              maxLength={250}
              className={Styles.textarea}
              onChange={(e) => setContent(e.target.value)}
              placeholder='250字以内で入力してください'
            ></textarea>
            <Button onClick={sendPost}>投稿する</Button>
            <p></p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
