import Image from 'next/image';
import React from 'react';
import Styles from '../styles/register.module.css';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { createUser } from '../services/users';
import { findAllUser } from '../repositories/users';

type FormValuse = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    await createUser(data.name, data.email, data.password);
  };

  return (
    <div>
      <div className={Styles.grid_container}>
        <div className={Styles.item_A}>アカウント作成</div>
        <div className={Styles.item_B}>
          <Image
            priority
            src='/images/treeIcon.jpg'
            height={80}
            width={80}
            alt={'アイコン'}
          />
        </div>
        <form className={Styles.container} onSubmit={handleSubmit(onSubmit)}>
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
                  const users = await findAllUser();
                  for (let i = 0; i < users.length; i++) {
                    if (name === users[i].name) {
                      return 'このニックネームはすでに登録されています';
                    }
                  }
                },
              },
            })}
            type='text'
            placeholder='ニックネーム'
            className={Styles.item_C}
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
                  const users = await findAllUser();
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
            className={Styles.item_D}
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
            className={Styles.item_E}
          />
          {errors.confirmPassword && (
            <div>{errors.confirmPassword.message}</div>
          )}
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
            className={Styles.item_F}
          />
          <button type='submit' className={Styles.item_G}>
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
