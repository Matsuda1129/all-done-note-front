import instance from '../axios';

export async function findOneLike(postId: number, userId: number) {
  const res = await instance.post('/like/get', {
    userId: userId,
    postId: postId,
  });

  return res.data;
}

export async function createOneLike(postId: number, userId: number) {
  await instance.post('like', {
    userId: userId,
    postId: postId,
  });
}

export async function countOneLike(postId: number) {
  const res = await instance.post('/like/count', {
    postId: postId,
  });

  return res.data;
}

export async function deleteOneLike(postId: number, userId: number) {
  await instance({
    method: 'delete',
    url: `like`,
    data: {
      userId: userId,
      postId: postId,
    },
  });
}

export async function findUserLikes(userId: number) {
  const res = await instance.post('/like/user', {
    userId: userId,
  });

  return res.data;
}
