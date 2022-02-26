import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import Styles from './willModal.module.css';
import { RootState } from '../../../redux/store';
import { useForm } from 'react-hook-form';
import { s3Repository, usersRepository } from '../../../repositories';
import { Button } from '../../utils';
import { setUsers } from '../../../redux/usersSlice';
import { Divide } from 'hamburger-react';

export default function WillModal({ willModal, setWillModal }) {
  const loginUser: any = useSelector((state: RootState) => state.users.user);
  const [checkPassword, setCheckPassword] = useState(false);
  const dispatch = useDispatch();

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
      await setWillModal(false);
      await backfaceFixed(false);
    } catch (error) {
      alert('投稿できませんでした');
    }
  };

  const onSubmit = async (data) => {
    try {
      await reset();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadWill = async () => {
    let element: any = document.getElementById('will');
    await s3Repository.uploadWill(element.files, loginUser.name);
    await usersRepository.editWill(loginUser.id, true);
    const res = await usersRepository.find(loginUser.name);
    await dispatch(setUsers(res));
  };

  const deleteWill = async () => {
    const check = confirm('アップロードしている遺書を削除してよいですか？');
    if (check) {
      await s3Repository.deleteWill(loginUser.name);
      await usersRepository.editWill(loginUser.id, false);
      const res = await usersRepository.find(loginUser.name);
      await dispatch(setUsers(res));
    }
  };

  return (
    <>
      {willModal ? (
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <div className={Styles.flexBox}>
              <button className={Styles.batsu} onClick={closeModal}>
                ×
              </button>
              <div>　　遺書メニュー</div>
            </div>

            {checkPassword ? (
              <div className={Styles.flexBoxColumn}>
                <br />
                <div>遺書のアップロード or 更新</div>
                <input id='will' type='file' onChange={uploadWill} />
                <br />
                {loginUser.will ? (
                  <div>
                    <div>遺書の削除　</div>
                    <Button onClick={deleteWill}>削除する</Button>
                    <br />
                    <br />
                    <div>遺書のダウンロード　</div>
                    <a
                      href={`/api/download-url?file=will/${loginUser.name}:will`}
                      download={`${loginUser.name}の遺書`}
                      className={Styles.willDownload}
                    >
                      ダウンロードする
                    </a>
                    <br />
                  </div>
                ) : (
                  <div>現在遺書はアップロードされていません</div>
                )}
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
