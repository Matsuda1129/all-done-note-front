import React, { useEffect, useState } from 'react';
import Styles from '../styles/mail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { mailsRepository } from '../repositories';
import { MailLayout, MailList } from '../components/Mail';
import { setFalse } from '../redux/isUseEffect';

export default function Mail() {
  const dispatch = useDispatch();
  const mailView = useSelector((state: RootState) => state.mails.mailView);
  const loginUser = useSelector((state: RootState) => state.users.user);
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );
  const [sendMails, setSendMails] = useState([]);
  const [recievedMails, setRecievedMails] = useState([]);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const sendMailsData = await mailsRepository.findSendMail(loginUser.id);
        const recievedMailsData = await mailsRepository.findRecievedMail(
          loginUser.id
        );
        await setSendMails(sendMailsData);
        await setRecievedMails(recievedMailsData);
        await dispatch(setFalse());
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [loginUser.id, isUseEffect, dispatch]);

  if (mailView) {
    return (
      <MailLayout>
        <br />
        <div className={Styles.boxName}>送信BOX</div>
        <br />
        <div className={Styles.margin}>送信先</div>
        <div className={Styles.border}></div>
        {sendMails.map((mail) => {
          return <MailList mail={mail} key={mail.id} />;
        })}

        <div></div>
      </MailLayout>
    );
  } else {
    return (
      <MailLayout>
        <br />
        <div className={Styles.boxName}>受信BOX</div>
        <br />
        <div className={Styles.margin}>送信元</div>
        <div className={Styles.border}></div>
        {recievedMails.map((mail) => {
          return <MailList mail={mail} key={mail.id} />;
        })}
      </MailLayout>
    );
  }
}
