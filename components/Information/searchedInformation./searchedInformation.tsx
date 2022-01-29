import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { informationRepository } from '../../../repositories';
import { Loader } from '../../parts';
import Styles from './searchedInformation.module.css';

export default function SearchedInformation({ searchGenre, searchTitle }) {
  const [information, setInformation] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const informationData = await informationRepository.searchInformation(
          searchGenre,
          searchTitle,
          1
        );
        await setInformation(informationData);
        await setHasMore(true);
        await setPage(2);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [searchGenre, searchTitle]);

  const fetchData = async () => {
    const componentsFormServer: any =
      await informationRepository.searchInformation(
        searchGenre,
        searchTitle,
        page
      );
    setInformation([...information, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={information.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader posts={information} />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {information.map((information) => {
          return (
            <div className={Styles.information} key={information.id}>
              <div> {information.genre}</div>
              <a href={`${information.url}`}>{information.title}</a>
              <div>{information.content}</div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
