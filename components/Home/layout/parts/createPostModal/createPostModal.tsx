import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { setModalFalse } from '../../../../../redux/modalSlice';
import { setTrue } from '../../../../../redux/isUseEffect';
import Styles from './createPostModal.module.css';
import { Button } from '../../../../utils';
import { postsRepository } from '../../../../../repositories';
import { useForm } from 'react-hook-form';

import { backfaceFixed } from '../../../../../lib/backFaceFixed';

type FormValuse = {
  content: string;
};

export default function CreatePostModal() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const modal = useSelector((state: RootState) => state.modalPost);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    try {
      await dispatch(setModalFalse());
      await dispatch(setTrue());
      await backfaceFixed(false);
      await postsRepository.create(user.id, data.content);
      await reset();
      await alert('投稿しました');
    } catch (error) {
      alert('投稿できませんでした');
    }
  };

  return (
    <>
      {modal.modalPost ? (
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button
              className={Styles.batsu}
              onClick={() => {
                dispatch(setModalFalse()), backfaceFixed(false);
              }}
            >
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.content && (
                <div style={{ color: 'red' }}>{errors.content.message}</div>
              )}
              <textarea
                {...register('content', {
                  required: '入力してください',
                  maxLength: {
                    value: 250,
                    message: '250字以内でお願いします',
                  },
                })}
                maxLength={250}
                rows={5}
                className={Styles.textarea}
                placeholder='250字以内で入力してください'
              ></textarea>
              <Button type='submit'>投稿する</Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
