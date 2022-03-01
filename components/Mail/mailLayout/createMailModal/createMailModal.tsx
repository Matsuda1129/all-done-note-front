import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './createMailModal.module.css';
import { useForm } from 'react-hook-form';
import { Button } from '../../../utils';
import { RootState } from '../../../../redux/store';
import { mailsRepository, usersRepository } from '../../../../repositories';
import { setTrue } from '../../../../redux/isUseEffect';

type FormValuse = {
  address: string;
  title: string;
  message: string;
};

export default function CreateMailModal({ modalIsOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.users.user);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data: FormValuse) => {
    try {
      await setIsOpen(false);
      await mailsRepository.create(
        loginUser.id,
        data.address,
        data.title,
        data.message
      );
      await dispatch(setTrue());
      await reset();
      await alert('送信しました');
    } catch (error) {
      alert('送信できませんでした');
    }
  };

  return (
    <>
      {modalIsOpen ? (
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button className={Styles.batsu} onClick={() => setIsOpen(false)}>
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              {errors.address && (
                <div style={{ color: 'red' }}>{errors.address.message}</div>
              )}
              <div className={Styles.flex_container}>
                <div>宛先</div>
                <input
                  {...register('address', {
                    required: '宛先を入力してください',
                    maxLength: {
                      value: 50,
                      message: '50字以内でお願いします',
                    },
                    validate: {
                      checkName: async () => {
                        const { address } = getValues();
                        const users = await usersRepository.find(address);
                        {
                          return users ? null : 'このユーザーは存在しません';
                        }
                      },
                    },
                  })}
                  maxLength={50}
                  className={Styles.address}
                />
              </div>
              {errors.title && (
                <div style={{ color: 'red' }}>{errors.title.message}</div>
              )}
              <div className={Styles.flex_container}>
                <div>件名</div>
                <input
                  {...register('title', {
                    required: '件名を入力してください',
                    maxLength: {
                      value: 50,
                      message: '50字以内でお願いします',
                    },
                  })}
                  maxLength={50}
                  className={Styles.title}
                />
              </div>
              <div className={Styles.border}></div>
              {errors.message && (
                <div style={{ color: 'red' }}>{errors.message.message}</div>
              )}
              <textarea
                {...register('message', {
                  required: '内容を入力してください',
                  maxLength: {
                    value: 1000,
                    message: '1000字以内でお願いします',
                  },
                })}
                maxLength={1000}
                rows={5}
                className={Styles.textarea}
                placeholder='1000字以内で入力してください'
              ></textarea>
              <Button type='submit'>送信する</Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
