import React, { useEffect, useState } from 'react';
import Styles from '../styles/mail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { mailsRepository } from '../repositories';
import { MailLayout, MailList } from '../components/Mail';
import { setFalse } from '../redux/isUseEffect';
import { setMailViewFalse, setMailViewTrue } from '../redux/mailSlice';
import CreateMailModal from '../components/Mail/mailLayout/createMailModal/createMailModal';

export default function Mail() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const mailView = useSelector((state: RootState) => state.mails.mailView);
  const [modalIsOpen, setIsOpen] = useState(false);
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );
  const [sendMails, setSendMails] = useState([]);
  const [recievedMails, setRecievedMails] = useState([]);
  const underline = {
    borderBottom: 'solid 2px #00f',
    color: 'red',
  };

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

  return (
    <div>
      <MailLayout>
        <br className={Styles.br} />
        <div className={Styles.flex_container_mailBar}>
          <button
            className={`${Styles.button} ${Styles.iconPuls}`}
            onClick={() => setIsOpen(true)}
          >
            作成
          </button>
          <div style={mailView === false ? underline : null}>
            <button
              className={`${Styles.button}  ${Styles.iconPost}`}
              onClick={() => dispatch(setMailViewFalse())}
            >
              受信トレイ
            </button>
          </div>
          <div
            className={`${Styles.button} ${Styles.iconKamihikouki}`}
            style={mailView === true ? underline : null}
          >
            <button
              className={Styles.button}
              onClick={() => dispatch(setMailViewTrue())}
            >
              送信済み
            </button>
          </div>
        </div>

        <div className={Styles.border_bottom}></div>

        {mailView ? (
          <div>
            <br />
            <div className={Styles.boxName}>送信BOX</div>
            <br />
            <div className={Styles.margin}>送信先</div>
            <div className={Styles.border}></div>
            {sendMails.map((mail) => {
              return <MailList mail={mail} key={mail.id} />;
            })}
          </div>
        ) : (
          <div>
            <br />
            <div className={Styles.boxName}>受信BOX</div>
            <br />
            <div className={Styles.margin}>送信元</div>
            <div className={Styles.border}></div>
            {recievedMails.map((mail) => {
              return <MailList mail={mail} key={mail.id} />;
            })}
          </div>
        )}
      </MailLayout>
      <CreateMailModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
