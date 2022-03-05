import { setUsers } from '../redux/usersSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AllPosts,
  Layout,
  ResearchBar,
  ResearchedBar,
  SearchPosts,
} from '../components/Home';
import { usersRepository } from '../repositories';
import { setLoadingFalse } from '../redux/loadingSlice';

export default function Home() {
  const dispatch = useDispatch();
  const [checkedSearch, setCheckedSearch] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const loginData = await usersRepository.findLogin();
        await dispatch(setUsers(loginData));
        await dispatch(setLoadingFalse());
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [dispatch]);

  {
    if (checkedSearch === false) {
      return (
        <Layout>
          <ResearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            setCheckedSearch={setCheckedSearch}
          />
          <AllPosts />
        </Layout>
      );
    } else {
      return (
        <Layout>
          <ResearchedBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            setCheckedSearch={setCheckedSearch}
          />
          <SearchPosts searchWord={searchWord} />
        </Layout>
      );
    }
  }
}
