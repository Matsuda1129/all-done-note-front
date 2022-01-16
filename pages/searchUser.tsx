import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Header } from '../components/Home';
import { ProtectRoute } from '../components/Home/protectRouter/protectRouter';
import { searchUser } from '../repositories/users';
import Styles from '../styles/searchUser.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FollowButton, UserSearchBar } from '../components/SearchUser';

export default function Information() {
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(Number);
  const [page, setPage] = useState(2);
  console.log(page);

  useEffect(() => {
    const firstFetch = async () => {
      const searchUserData: any = await searchUser(searchWord, 1, gender, age);
      await setPage(2);
      await setHasMore(true);
      await setUsers(searchUserData);
    };
    firstFetch();
  }, [searchWord, gender, age]);

  const fetchData = async () => {
    const componentsFormServer: any = await searchUser(
      searchWord,
      page,
      gender,
      age
    );
    setUsers([...users, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <ProtectRoute>
      <header>
        <Header />
      </header>
      <main>
        <div className={Styles.grid_container}>
          <div className={Styles.item_A}>
            <h1 className={Styles.title}>ユーザー検索</h1>
            <div className={Styles.searchForm}>
              <UserSearchBar
                setSearchWord={setSearchWord}
                setGender={setGender}
                setAge={setAge}
              />
            </div>
          </div>
          <div className={Styles.item_B}>
            <InfiniteScroll
              dataLength={users.length}
              next={fetchData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
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
                    <FollowButton user={user} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </main>
    </ProtectRoute>
  );
}
