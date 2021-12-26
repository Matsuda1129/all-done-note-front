import { fetchPosts } from '../repositories/posts';

export async function fetcData2({ page, posts, setPosts, setHasMore, setPage }) {
  const componentsFormServer = await fetchPosts(page);
  setPosts([...posts, ...componentsFormServer]);
  if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
    setHasMore(false);
  }
  setPage(page + 1);
}
