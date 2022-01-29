import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { likesRepository } from '../../../repositories';
import { Loader, InfinitePosts } from '../../parts';

export default function MyGoodPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const res: any = await likesRepository.findUser(1, userId);
        let data = [];
        for (let i = 0; i < res.length; i++) {
          data.push(res[i].post);
        }
        await setPosts(data);
        await setPage(2);
        await setHasMore(true);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
    if (posts.length === 0) {
      firstFetch();
    }
  }, [posts.length, userId]);

  const fetchData = async () => {
    const res: any = await likesRepository.findUser(page, userId);
    let componentsFormServer = [];
    for (let i = 0; i < res.length; i++) {
      componentsFormServer.push(res[i].post);
    }
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
