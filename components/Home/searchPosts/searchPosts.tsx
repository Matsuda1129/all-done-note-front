import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { postsRepository } from '../../../repositories';
import { Loader, InfinitePosts } from '../../parts';

export default function SearchPosts({ searchWord }) {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const page1 = await postsRepository.fetchSearch(1, searchWord);
        await setPosts(page1);
        await setPage(2);
        await setHasMore(true);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [searchWord]);

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
