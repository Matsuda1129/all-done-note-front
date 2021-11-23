import Image from 'next/image';
import Head from 'next/head';
import loginStyles from '../styles/login.module.css';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import Cooike from 'js-cookie';
import { useCookies } from 'react-cookie';
import axios from 'axios';

type FormValuse = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [cookies, setCookie] = useCookies(['jwt']);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async () => {
    try {
      const getUser = await axios.get(`${process.env.baseURL}/user`);
      console.log(getUser.data);

      const res = await axios.post(
        `${process.env.baseURL}/user/login`,
        {
          email,
          password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(res);
      const loginData = await res.data;
      // const cookie = cookies.get('jwt');
      setCookie('jwt', loginData.jwt);
      // Cooike.set('jwt', loginData.jwt);
      Cooike.set('signedIn', 'true');
      await router.push('/home');
    } catch (e) {}
  };

  return (
    <div>
      <Head>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      </Head>
      <div className={loginStyles.grid_container}>
        <div className={loginStyles.item_A}>
          <Image
            priority
            src='/images/treeIcon.jpg'
            height={80}
            width={80}
            alt={'アイコン'}
          />
        </div>
        <div className={loginStyles.item_B}>
          <span className={loginStyles.text}>All Done ノート</span>
          <span className={loginStyles.text}>にログイン</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={loginStyles.form}>
          <input
            {...register('email', {
              required: 'メールドレスは必須項目です',
              maxLength: {
                value: 50,
                message: 'メールドレスは50字以内でお願いします',
              },
            })}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='メールドレス'
            className={loginStyles.item_C}
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
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='パスワード'
            className={loginStyles.item_D}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <button type='submit' className={loginStyles.item_E}>
            ログインする
          </button>
        </form>
        <input
          type='submit'
          value='Twitrerでログインする'
          className={loginStyles.item_F}
        />
        <input
          type='submit'
          value='Googleでログインする'
          className={loginStyles.item_G}
        />
        <div className={loginStyles.item_I}>
          <a href=''>パスワードをお忘れですか？</a>
        </div>
        <div className={loginStyles.item_J}>
          <Link href='./register'>
            <a>アカウント作成</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
