import instance from '../axios';

export async function findAllUser() {
  const res = await instance.get('user');
  const users: any = res.data;

  return users;
}

export async function findLoginUser() {
  const res = await instance.get('/user/cookie');
  const cookie = await res.data;

  return cookie;
}

export async function findOneUser(username: string) {
  const res = await instance.get(`/user/${username}`);
  const user = await res.data;

  return user;
}

export async function editProfile(data, userId) {
  const res = await instance.put(`/user/${userId}`, {
    name: data.name,
    introduction: data.introduction,
    gender: data.gender,
    alive: data.alive,
    birthday: data.birthday,
  });

  return res.data;
}
