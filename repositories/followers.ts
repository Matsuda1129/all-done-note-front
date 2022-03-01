import instance from '../axios';

export async function findFollower(userId: number, followerId: number) {
  if (userId !== null) {
    const res = await instance.post('/follower/findOne', {
      userId: userId,
      followerId: followerId,
    });

    return res.data;
  }
}

export async function create(userId: number, followerId: number) {
  const res = await instance.post('/follower', {
    userId: userId,
    followerId: followerId,
  });

  return res.data;
}

export async function countFollowers(followerId: number) {
  const res = await instance.post('/follower/count', {
    followerId: followerId,
  });

  return res.data;
}

export async function countFollowing(userId: number) {
  const res = await instance.post('/follower/count/following', {
    userId: userId,
  });

  return res.data;
}
export async function deleteOne(userId: number, followerId: number) {
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
