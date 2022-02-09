import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { setFalse } from '../../../redux/isUseEffect';
import { RootState } from '../../../redux/store';
import { postsRepository } from '../../../repositories';
import { Loader, InfinitePosts } from '../../parts';

export default function SearchPosts({ searchWord }) {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const dispatch = useDispatch();
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const page1 = await postsRepository.fetchSearch(1, searchWord);
        console.log(searchWord);
        await setPosts(page1);
        await setPage(2);
        await setHasMore(true);
        await dispatch(setFalse());
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [searchWord, isUseEffect, dispatch]);

  const fetchData = async () => {
    const componentsFormServer = await postsRepository.fetchSearch(
      page,
      searchWord
    );
    setPosts([...posts, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader posts={posts} />}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <InfinitePosts posts={posts} />
    </InfiniteScroll>
  );
}
