import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
export default function Index() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/user`, {
          credentials: 'include',
        });

        const content = await response.json();
        if (content.statusCode) {
          throw new Error('error');
        }

        setUsers(content);
      } catch (e) {
        setUsers([]);
      }
    })();
  });

  return (
    <div>
      <h1>一覧</h1>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>
                <a>{user.username}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
  // const getJwt = await fetch(`${process.env.baseURL}/user/cookie`, {
  //   method: 'GET',
  //   mode: 'cors',
  //   credentials: 'include',
  // });
  // console.log(getJwt);
  // let getCookieData = document.cookie;
  // console.log(getCookieData);
  // const res = await fetch(`${process.env.baseURL}/user`, {
  //   method: 'GET',
  //   mode: 'cors',
  //   credentials: 'include',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const users = await res.json();

  // console.log(users);

  // return {
  //   props: { users },
  //   revalidate: 1,
  // };
// };
