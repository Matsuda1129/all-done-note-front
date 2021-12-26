import instance from '../axios';
import { deleteProfilephoto } from './s3';

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

export async function editProfile(data, userId, userPicture) {
  let alive = true;
  if (data.alive === 'false') {
    alive = false;
  }
  console.log(userPicture);
  deleteProfilephoto(userPicture);
  const res = await instance.put(`/user/${userId}`, {
    name: data.name,
    introduction: data.introduction,
    gender: data.gender,
    alive: alive,
    birthday: data.birthday,
    picture: data.picture[0].name,
  });

  return res.data;
}
