import { postsRepository } from '../repositories';

export async function fetchData({
  page,
  posts,
  setPosts,
  setHasMore,
  setPage,
}) {
  const componentsFormServer = await postsRepository.fetchData(page);
  setPosts([...posts, ...componentsFormServer]);
  if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
    setHasMore(false);
  }
  setPage(page + 1);
}
