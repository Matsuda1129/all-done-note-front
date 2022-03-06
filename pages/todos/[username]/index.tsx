import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../../../components/Home';
import { TodoCharts } from '../../../components/parts';
import { RootState } from '../../../redux/store';
import { changeOpenData } from '../../../redux/todos/openDataSlice';
import { todosService } from '../../../services';
import Styles from '../../../styles/todo/todos.module.css';

export default function Detail() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [username, setUsername] = useState<string>();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const openData = useSelector((state: RootState) => state.openData.open);
  useEffect(() => {
    if (router.asPath !== router.route) {
      setUsername(String(router.query.username));
    }
  }, [router]);

  useEffect(() => {
    if (username) {
      const firstFetch = async () => {
        try {
          const res = await todosService.checkOpenData(username, loginUser.id);
          await dispatch(changeOpenData(res));
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [dispatch, loginUser.id, username]);

  return (
    <Layout>
      {openData ? (
        <div>
          <br />
          <Link href={`../../todos/${username}/lists`}>
            <a href='' className={Styles.list_position}>
              {username}の目標リスト一覧へ
            </a>
          </Link>

          <TodoCharts username={username} />
        </div>
      ) : (
        <div className={Styles.middle}>
          {username}はデータを非公開にしています
        </div>
      )}
    </Layout>
  );
}
