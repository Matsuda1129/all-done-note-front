import React from 'react';
import { setTrue } from '../../../../../redux/isUseEffect';
import Styles from './editPostModal.module.css';
import { Button } from '../../../../utils';
import { postsRepository } from '../../../../../repositories';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { backfaceFixed } from '../../../../../lib/backFaceFixed';

type FormValuse = {
  content: string;
};

export default function EditPostModal({ modal, showModal, post }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    try {
      await postsRepository.update(post.id, data.content);
      await alert('編集しました');
      await backfaceFixed(false);
      await dispatch(setTrue());
      await showModal();
    } catch (error) {
      alert('編集できませんでした');
    }
  };
  if (modal) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button className={Styles.batsu} onClick={showModal}>
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
                defaultValue={post.content}
                maxLength={250}
                rows={5}
                className={Styles.textarea}
                placeholder='250字以内で入力してください'
              ></textarea>
              <Button type='submit'>更新する</Button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
