import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrue } from '../../../redux/isUseEffect';
import { RootState } from '../../../redux/store';
import { mailsRepository } from '../../../repositories';
import Styles from './mailList.module.css';

export default function MailList({ mail }) {
  const dispatch = useDispatch();
  const mailView = useSelector((state: RootState) => state.mails.mailView);

  let createTime = mail.createdAt.slice(0, 10);

  const onUnread = async () => {
    if (!mail.unread) {
      await mailsRepository.onUnread(mail);
    }
  };

  const changeUnread = async () => {
    await mailsRepository.changeUnread(mail);
    await dispatch(setTrue());
  };

  const deleteMail = async () => {
    const check = await confirm('メールを削除してよいですか？');
    if (check) {
      await mailsRepository.deleteOne(mail.id);
      await dispatch(setTrue());
    }
  };

  return (
    <>
      <div className={mail.unread === true ? Styles.read : Styles.unread}>
        <div className={Styles.flex_container}>
          <Link href={`../mails/${mail.id}`}>
            <a className={Styles.a} onClick={() => onUnread()}>
              {mailView ? (
                <div className={Styles.name}>{mail.recipient.name}</div>
              ) : (
                <div className={Styles.name}>{mail.user.name}</div>
              )}
              <div className={Styles.title}>{mail.title}</div>
              <div className={Styles.time}> {createTime}</div>
            </a>
          </Link>
          <div
            className={
              mail.unread === true ? Styles.mail_bar : Styles.mail_bar_read
            }
          >
            <button
              className={
                mail.unread === true
                  ? Styles.iconCloseMail
                  : Styles.iconOpenMail
              }
              onClick={() => changeUnread()}
            ></button>
            <button
              className={mail.unread === true
                ? Styles.iconRubbish2
                : Styles.iconRubbish}
              onClick={() => deleteMail()}
            ></button>
          </div>
        </div>
      </div>
    </>
  );
}
