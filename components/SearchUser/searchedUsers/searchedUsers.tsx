import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { usersRepository } from '../../../repositories';
import { Loader, CountFollower, FollowButton } from '../../parts';
import Image from 'next/image';
import Styles from './searchedUser.module.css';

export default function SearchedUsers({ age, gender, searchWord,job }) {
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const page1 = await usersRepository.fetchSearch(
          searchWord,
          1,
          gender,
          age,
          job
        );
        await setUsers(page1);
        await setPage(2);
        await setHasMore(true);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [age, gender, searchWord,job]);

  const fetchData = async () => {
    const componentsFormServer = await usersRepository.fetchSearch(
      searchWord,
      page,
      gender,
      age,
      job
    );
    setUsers([...users, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={users.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader posts={users} />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {users.map((user) => {
        return (
          <div className={Styles.userBar} key={user.id}>
            <Image
              className={Styles.triming}
              priority
              src={process.env.NEXT_PUBLIC_IMAGE_URL + user.picture}
              height={50}
              width={70}
              alt={'アイコン'}
            />
            <Link href={`../users/${user.name}`}>
              <a className={Styles.name} href=''>
                {user.name}
              </a>
            </Link>
            <div className={Styles.name}>
              <CountFollower userId={user.id} />
            </div>
            <FollowButton userId={user.id} />
          </div>
        );
      })}
    </InfiniteScroll>
  );
}
