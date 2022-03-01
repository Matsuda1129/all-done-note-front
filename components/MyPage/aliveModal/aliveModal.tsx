import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import Styles from './aliveModal.module.css';
import { RootState } from '../../../redux/store';
import { useForm } from 'react-hook-form';
import {
  flashesRepository,
  s3Repository,
  usersRepository,
} from '../../../repositories';
import { setUsers } from '../../../redux/usersSlice';
import { Button } from '../../utils';

export default function AliveModal({ aliveModal, setAliveModal }) {
  const dispatch = useDispatch();
  const loginUser: any = useSelector((state: RootState) => state.users.user);
  const [checkPassword, setCheckPassword] = useState(false);

  type FormValuse = {
    password: string;
  };
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValuse>();

  const closeModal = async () => {
    try {
      await setAliveModal(false);
      await backfaceFixed(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await reset();
    } catch (error) {
      console.log(error);
    }
  };

  const changeAlive = async () => {
    if (loginUser.alive) {
      const check = confirm(`ユーザーの死亡者に変更しますがよろしですか？`);
      if (check) {
        await usersRepository.editAlive(loginUser.id, false);
        const res = await usersRepository.find(loginUser.name);
        await dispatch(setUsers(res));
        await flashesRepository.tellDeath(loginUser.id);
      }
    } else {
      const check = confirm(`ユーザーの生存者に変更しますがよろしですか？`);
      if (check) {
        await usersRepository.editAlive(loginUser.id, true);
        const res = await usersRepository.find(loginUser.name);
        await dispatch(setUsers(res));
      }
    }
  };

  return (
    <>
      {aliveModal ? (
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <div className={Styles.flex}>
              <button className={Styles.batsu} onClick={closeModal}>
                ×
              </button>
              <div>　　aliveメニュー</div>
            </div>

            {checkPassword ? (
              <div className={Styles.flexBox}>
                <button className={Styles.btn} onClick={changeAlive}>
                  {loginUser.alive
                    ? '死亡者にデータを変更する'
                    : '生存者にデータを変更する'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                {errors.password && <div>{errors.password.message}</div>}
                <input
                  {...register('password', {
                    required: 'パスワードは必須項目です',
                    validate: {
                      checkPassword: async () => {
                        const { password } = getValues();
                        const res: any = await usersRepository.checkPassword(
                          loginUser.id,
                          password
                        );
                        if (res.data !== true) {
                          return 'パスワードが違います';
                        }

                        await setCheckPassword(res.data);
                      },
                    },
                  })}
                  type='password'
                  placeholder='パスワード'
                />
                <button type='submit'>送信</button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
