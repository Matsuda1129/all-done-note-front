import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MailLayout } from '../../components/Mail';
import { mailsRepository } from '../../repositories';
import Styels from '../../styles/mail/mailDetail.module.css';

export default function MailsDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageId, setPageId] = useState(Number);

  type mail = {
    id: number;
    user: any;
    recipient: any;
    title: string;
    message: string;
  };
  const [mail, setMail] = useState<mail>();

  useEffect(() => {
    setPageId(Number(router.query.id));
  }, [router.query]);

  useEffect(() => {
    if (pageId) {
      const firstFetch = async () => {
        try {
          const mailData: any = await mailsRepository.findById(pageId);
          await setMail(mailData);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [pageId]);

  return (
    <>
      {mail ? (
        <MailLayout>
          <p>
            <a href='#' onClick={() => history.back()}>
              前のページにもどる
            </a>
          </p>

          <div className={Styels.mail_position}>
            <div className={Styels.margin}>送信者　{mail.user.name}</div>
            <div className={Styels.margin}>受信者　{mail.recipient.name}</div>
            <div className={Styels.margin}>件名　{mail.title}</div>
            <div>内容</div>
            <div>{mail.message}</div>
          </div>
        </MailLayout>
      ) : (
        <MailLayout>
          <div>データがありません</div>
        </MailLayout>
      )}
    </>
  );
}
