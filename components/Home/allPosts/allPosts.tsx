import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { postsRepository } from '../../../repositories';
import { Loader, InfinitePosts } from '../../parts';

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const page1 = await postsRepository.fetchData(1);
        await setPosts(page1);
        await setPage(2);
        await setHasMore(true);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, []);

  const fetchData = async () => {
    const componentsFormServer = await postsRepository.fetchData(page);
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
