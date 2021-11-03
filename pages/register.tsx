import Image from 'next/image';
import React, { useState } from 'react';
import registerStyles from '../styles/register.module.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

type FormValuse = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function CreateAccountPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValuse>();

  const createNewUser = async () => {
    if (password !== confirmPassword) {
    }
    axios
      .post(`${process.env.baseURL}/user/register`, {
        name: name,
        email: email,
        password: password,
      })
      .catch((error) => {
        // console.log(error);
      });

    alert('アカウントの登録ができました');
    await router.push('/login');
  };

  return (
    <div>
      <div className={registerStyles.grid_container}>
        <div className={registerStyles.item_A}>アカウント作成</div>
        <div className={registerStyles.item_B}>
          <Image
            priority
            src='/images/treeIcon.jpg'
            height={80}
            width={80}
            alt={'アイコン'}
          />
        </div>
        <form
          className={registerStyles.container}
          onSubmit={handleSubmit(createNewUser)}
        >
          {errors.name && <div>{errors.name.message}</div>}
          <input
            {...register('name', {
              required: 'ニックネームは必須項目です',
              maxLength: {
                value: 20,
                message: 'ニックネームは20字以内でお願いします',
              },
            })}
            type='text'
            placeholder='ニックネーム'
            onChange={(e) => setName(e.target.value)}
            className={registerStyles.item_C}
          />
          {errors.email && <div>{errors.email.message}</div>}
          <input
            {...register('email', {
              required: 'メールアドレスは必須項目です',
              maxLength: {
                value: 50,
                message: 'メールアドレス50字以内でお願いします',
              },
            })}
            type='text'
            placeholder='メールアドレス'
            onChange={(e) => setEmail(e.target.value)}
            className={registerStyles.item_D}
          />
          {errors.password && <div>{errors.password.message}</div>}
          <input
            {...register('password', {
              required: 'パスワードは必須項目です',
              maxLength: {
                value: 20,
                message: 'パスワードは20字以内でお願いします',
              },
              minLength: {
                value: 6,
                message: 'パスワードは6字以上でお願いします',
              },
            })}
            type='password'
            placeholder='パスワード'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={registerStyles.item_E}
          />
          {errors.confirmPassword && (
            <div>{errors.confirmPassword.message}</div>
          )}
          <input
            value={confirmPassword}
            {...register('confirmPassword', {
              required: '再入力パスワードは必須項目です',
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();

                  return password === value || 'パスワードと一致しません';
                },
              },
              maxLength: {
                value: 20,
                message: '再入力パスワードは20字以内でお願いします',
              },
              minLength: {
                value: 6,
                message: '再入力パスワードは6字以上でお願いします',
              },
            })}
            type='password'
            placeholder='再入力パスワード'
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={registerStyles.item_F}
          />
          <button type='submit' className={registerStyles.item_G}>
            アカウント作成
          </button>
        </form>
        <Link href='./login'>
          <a>ログイン画面へ</a>
        </Link>
      </div>
    </div>
  );
}
