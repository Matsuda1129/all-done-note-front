import instance from '../axios';

export async function findPage1() {
  const res = await instance.get('/post/page?page=1&limit=20');
  const items: any = res.data;

  return items.items;
}

export async function fetchPosts(page: number) {
  const res = await instance.get(`/post/page?page=${page}&limit=20`);
  const data: any = await res.data;

  return data.items;
}

export async function createPost(userId, content) {
  await instance.post('post', {
    userId: userId,
    content: content,
  });
}
