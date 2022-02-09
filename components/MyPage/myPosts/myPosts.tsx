import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { setFalse } from '../../../redux/isUseEffect';
import { RootState } from '../../../redux/store';
import { postsRepository } from '../../../repositories';
import { Loader, InfinitePosts } from '../../parts';

export default function MyPosts({ userId }) {
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
        const data = await postsRepository.userPosts(1, userId);
        await setPosts(data);
        await setPage(2);
        await setHasMore(true);
        await dispatch(setFalse());
      } catch (error) {
        console.log(error);
      }
    };

    firstFetch();

    if (posts.length === 0) {
      firstFetch();
    }
  }, [dispatch, posts.length, userId, isUseEffect]);

  const fetchData = async () => {
    const componentsFormServer = await postsRepository.userPosts(page, userId);
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
