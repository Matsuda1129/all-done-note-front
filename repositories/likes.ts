import instance from '../axios';

export async function find(postId: number, userId: number) {
  const res = await instance.post('/like/get', {
    userId: userId,
    postId: postId,
  });

  return res.data;
}

export async function create(postId: number, userId: number) {
  await instance.post('like', {
    userId: userId,
    postId: postId,
  });
}

export async function count(postId: number) {
  const res = await instance.post('/like/count', {
    postId: postId,
  });

  return res.data;
}

export async function deleteOne(postId: number, userId: number) {
  await instance({
    method: 'delete',
    url: `like`,
    data: {
      userId: userId,
      postId: postId,
    },
  });
}

export async function findUser(page: number, userId: number) {
  const res: any = await instance.post(
    `/like/user/page?page=${page}&limit=20`,
    {
      userId: userId,
    }
  );

  return res.data.items;
}
