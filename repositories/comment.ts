import instance from '../axios';

export async function fetchComment(postId: number, page: number) {
  const res: any = await instance.get(
    `comment/${postId}/page?page=${page}&limit=20`
  );

  return res.data.items;
}

export async function create(userId: number, postId: number, comment: string) {
  await instance.post('comment', {
    userId: userId,
    postId: postId,
    comment: comment,
  });
}

export async function deleteOne(id: number) {
  await instance({
    method: 'delete',
    url: 'comment',
    data: {
      id: id,
    },
  });
}

export async function count(postId: number) {
  const res = await instance.post('comment/count', {
    postId: postId,
  });

  return res.data;
}
