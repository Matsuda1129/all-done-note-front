import instance from '../axios';

export async function fetchPosts(page: number) {
  const res = await instance.get(`/post/page?page=${page}&limit=20`);
  const data: any = await res.data;

  return data.items;
}

export async function fetchSearchedPosts(page: number, searchWord: string) {
  if (searchWord) {
    const res = await instance.get(
      `/post/${searchWord}/page?page=${page}&limit=20`
    );
    const data: any = await res.data;

    return data.items;
  } else {
    return [];
  }
}

export async function createPost(userId, content) {
  await instance.post('post', {
    userId: userId,
    content: content,
  });
}

export async function findAllPost() {
  const res = await instance.get('post');

  return res.data;
}
