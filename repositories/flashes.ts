import instance from '../axios';

export async function find() {
  const res: any = await instance.get('flash');

  return res.data;
}

export async function create(userId, message) {
  await instance.post('flash', {
    userId: userId,
    message: message,
  });
}

export async function tellDeath(userId) {
  await instance.post('flash', {
    userId: userId,
    message: 'さんのaliveデータが変更されました',
  });
}
