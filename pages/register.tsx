import Image from 'next/image';
import React from 'react';
import Styles from '../styles/register.module.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { usersService } from '../services';
import { usersRepository } from '../repositories';
import { useDispatch } from 'react-redux';
import { setLoadingTrue } from '../redux/loadingSlice';
import Loading from '../components/Loader/loading';

type FormValuse = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function Register() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    await dispatch(setLoadingTrue());
    await usersService.register(data.name, data.email, data.password);
  };

  return (
    <form
      className={Styles.flex_container_column}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Loading />
      <div className={Styles.flex_container}>
        <div className={Styles.margin}>アカウント作成</div>
        <Image
          priority
          src='/images/treeIcon.jpg'
          height={80}
          width={80}
          alt={'アイコン'}
        />
      </div>
      {errors.name && <div>{errors.name.message}</div>}
      <input
        {...register('name', {
          required: 'ニックネームは必須項目です',
          maxLength: {
            value: 20,
            message: 'ニックネームは20字以内でお願いします',
          },
          validate: {
            checkName: async () => {
              const { name } = getValues();
              const user = await usersRepository.find(name);
              if (user) {
                return 'このニックネームはすでに登録されています';
              }
            },
          },
        })}
        type='text'
        placeholder='ニックネーム'
        className={Styles.flex_container_item}
      />
      {errors.email && <div>{errors.email.message}</div>}
      <input
        {...register('email', {
          required: 'メールアドレスは必須項目です',
          maxLength: {
            value: 50,
            message: 'メールアドレス50字以内でお願いします',
          },
          validate: {
            checkEmail: async () => {
              const { email } = getValues();
              const users = await usersRepository.findAll();
              for (let i = 0; i < users.length; i++) {
                if (email === users[i].email) {
                  return 'このメールドレスはすでに登録されています';
                }
              }
            },
          },
        })}
        type='text'
        placeholder='メールアドレス'
        className={Styles.flex_container_item}
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
        className={Styles.flex_container_item}
      />
      {errors.confirmPassword && <div>{errors.confirmPassword.message}</div>}
      <input
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
        className={Styles.flex_container_item}
      />
      <button type='submit' className={Styles.accountBtn}>
        アカウント作成
      </button>
      <Link href='./login'>
        <a className={Styles.flex_container}>ログイン画面へ</a>
      </Link>
    </form>
  );
}
