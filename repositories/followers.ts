import instance from '../axios';

export async function findFollowers() {
  const res = await instance.get('/follower');

  return res.data;
}

export async function findOneFollower(userId: number, followerId: number) {
  const res = await instance.post('/follower/findOne', {
    userId: userId,
    followerId: followerId,
  });

  return res.data;
}

export async function createOneFollowers(userId: number, followerId: number) {
  const res = await instance.post('/follower', {
    userId: userId,
    followerId: followerId,
  });

  return res.data;
}

export async function countOneFollowers(followerId: number) {
  const res = await instance.post('/follower/count', {
    followerId: followerId,
  });

  return res.data;
}

export async function countOneFollowing(userId: number) {
  const res = await instance.post('/follower/count/following', {
    userId: userId,
  });

  return res.data;
}
export async function deleteOneFollower(userId: number, followerId: number) {
  const res = await instance({
    method: 'delete',
    url: '/follower',
    data: {
      userId: userId,
      followerId: followerId,
    },
  });

  return res.data;
}
