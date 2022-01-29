import React, { useState } from 'react';
import { Layout } from '../components/Home';
import { SearchedUsers, UserSearchBar } from '../components/SearchUser';

export default function Information() {
  const [searchWord, setSearchWord] = useState('');
  const [gender, setGender] = useState(undefined);
  const [age, setAge] = useState(undefined);

  return (
    <Layout>
      <div>
        <h1 style={{ textAlign: 'center' }}>ユーザー検索</h1>
        <div style={{ textAlign: 'center' }}>
          <UserSearchBar
            setSearchWord={setSearchWord}
            setGender={setGender}
            setAge={setAge}
          />
        </div>
        <br />
        <SearchedUsers gender={gender} age={age} searchWord={searchWord} />
      </div>
    </Layout>
  );
}
