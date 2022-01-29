import Image from 'next/image';
import Head from 'next/head';
import Styles from '../styles/login.module.css';
import { useForm } from 'react-hook-form';
import React from 'react';
import Link from 'next/link';
import { usersService } from '../services';

type FormValuse = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    try {
      await usersService.login(data.email, data.password);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <div className={Styles.grid_container}>
        <div className={Styles.item_A}>
          <Image
            priority
            src='/images/treeIcon.jpg'
            height={80}
            width={80}
            alt={'アイコン'}
          />
        </div>
        <div className={Styles.item_B}>
          <span className={Styles.text}>All Done ノート</span>
          <span className={Styles.text}>にログイン</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={Styles.form}>
          <input
            {...register('email', {
              required: 'メールドレスは必須項目です',
              maxLength: {
                value: 50,
                message: 'メールドレスは50字以内でお願いします',
              },
            })}
            type='email'
            placeholder='メールドレス'
            className={Styles.item_C}
          />
          {errors.email && <p>{errors.email.message}</p>}
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
            className={Styles.item_D}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button type='submit' className={Styles.item_E}>
            ログインする
          </button>
        </form>
        <input
          type='submit'
          value='Twitrerでログインする'
          className={Styles.item_F}
        />
        <input
          type='submit'
          value='Googleでログインする'
          className={Styles.item_G}
        />
        <div className={Styles.item_I}>
          <a href=''>パスワードをお忘れですか？</a>
        </div>
        <div className={Styles.item_J}>
          <Link href='./register'>
            <a>アカウント作成</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
