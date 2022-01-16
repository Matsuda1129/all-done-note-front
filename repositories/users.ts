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

export async function editProfile(data, user) {
  function getAge(birthday) {
    //今日
    const dateObject = new Date(birthday);
    const birthdayYear = dateObject.getFullYear();
    const birthdayMonth = dateObject.getMonth();
    const birthdayDate = dateObject.getDate();
    let today = new Date();

    //今年の誕生日
    let thisYearsBirthday = new Date(
      today.getFullYear(),
      birthdayMonth,
      birthdayDate
    );

    //年齢
    let age = today.getFullYear() - birthdayYear;

    if (today < thisYearsBirthday) {
      //今年まだ誕生日が来ていない
      age--;
    }

    return age;
  }
  const age = getAge(data.birthday);
  let alive = true;
  if (data.alive === 'false') {
    alive = false;
  }
  let picture;
  if (data.picture.length === 0) {
    picture = user.picture;
  } else {
    picture = data.picture[0].name;
  }
  const res = await instance.put(`/user/${user.id}`, {
    name: data.name,
    introduction: data.introduction,
    gender: data.gender,
    alive: alive,
    birthday: data.birthday,
    picture: picture,
    age: age,
  });

  return res.data;
}

export async function editPicture(userId, picture) {
  const res = await instance.put(`/user/${userId}`, {
    picture: picture,
  });

  return res.data;
}

export async function searchUser(searchWord, page, gender, age) {
  const res: any = await instance.post(`/user/page?page=${page}&limit=20`, {
    searchWord: searchWord,
    gender: gender,
    age: age,
  });

  return res.data.items;
}
