import instance from '../axios';

export async function find() {
  const res: any = await instance.get('flash');

  return res.data;
}

const messages = [
  'aaaaaaaaaa',
  'bbbbbbbbbbb',
  'ccccccccccccc',
  'ddddddddddddddddddddddd',
  'eeeeeeeeeeeeeeeeeeeeeeeeeeeee',
];

export async function create() {
  const message = messages[Math.floor(Math.random() * messages.length)];
  await instance.post('flash', {
    userId: 1,
    message: message,
  });
}

export async function tellDeath(userId) {
  await instance.post('flash', {
    userId: userId,
    message: 'さんが死亡者になりました。'
  });
}
