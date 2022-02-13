import React, { useState } from 'react';
import { Layout } from '../components/Home';
import { SearchedUsers, UserSearchBar } from '../components/SearchUser';
import Styles from '../styles/searchUser.module.css';

export default function Information() {
  const [searchWord, setSearchWord] = useState('');
  const [gender, setGender] = useState(undefined);
  const [alive, setAlive] = useState(undefined);
  const [age, setAge] = useState(undefined);
  const [job, setJob] = useState(undefined);
  const [family, setFamily] = useState({
    alone: false,
    isMarried: false,
    isParents: false,
    isSpouseParents: false,
    isChild: false,
    isChildren2: false,
    isChildren3: false,
    isOthers: false,
  });
  const [familyModal, setFamilyModal] = useState(false);

  return (
    <Layout>
      <div>
        <h1 style={{ textAlign: 'center' }}>ユーザー検索</h1>
        <div style={{ textAlign: 'center' }}>
          <UserSearchBar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            setGender={setGender}
            setAge={setAge}
            setAlive={setAlive}
            setJob={setJob}
            setFamily={setFamily}
            familyModal={familyModal}
            setFamilyModal={setFamilyModal}
          />
        </div>
        <br />
        <div>
          <SearchedUsers
            job={job}
            gender={gender}
            age={age}
            searchWord={searchWord}
            family={family}
            alive={alive}
            familyModal={familyModal}
          />
        </div>
      </div>
    </Layout>
  );
}
