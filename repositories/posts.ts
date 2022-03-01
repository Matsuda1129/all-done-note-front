import instance from '../axios';

export async function fetchData(page: number) {
  const res = await instance.get(`/post/page?page=${page}&limit=20`);
  const data: any = await res.data;

  return data.items;
}

export async function fetchSearch(page: number, searchWord: string) {
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

export async function userPosts(page: number, searchId: number) {
  const res = await instance.post(`/post/searchId/page?page=${page}&limit=20`, {
    searchId,
  });
  const data: any = await res.data;

  return data.items;
}

export async function create(userId, content, picture) {
  await instance.post('post', {
    userId: userId,
    content: content,
    picture: picture,
  });
}

export async function findAllPost() {
  const res = await instance.get('post');

  return res.data;
}

export async function findPostById(id: number) {
  const res = await instance.get(`post/${id}`);

  return res.data;
}

export async function deleteOne(id: number) {
  await instance({
    method: 'delete',
    url: `post/${id}`,
  });
}

export async function update(id: number, content: string, picture: string[]) {
  await instance.put(`post/update/${id}`, {
    content: content,
    picture: picture,
  });
}
