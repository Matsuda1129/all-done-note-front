import React, { useState } from 'react';
import { Layout } from '../components/Home';
import {
  InformationSearchBar,
  SearchedInformation,
} from '../components/Information';

export default function Information() {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchGenre, setSearchGenre] = useState(undefined);

  return (
    <Layout>
      <h1 style={{ textAlign: 'center' }}>情報検索</h1>
      <InformationSearchBar
        setSearchTitle={setSearchTitle}
        setSearchGenre={setSearchGenre}
        searchTitle={searchTitle}
      />
      <SearchedInformation
        searchGenre={searchGenre}
        searchTitle={searchTitle}
      />
    </Layout>
  );
}
