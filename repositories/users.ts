import instance from '../axios';

export async function findAll() {
  const res = await instance.get('user');
  const users: any = res.data;

  return users;
}

export async function findLogin() {
  const res = await instance.get('/user/cookie');
  const cookie = await res.data;

  return cookie;
}

export async function find(username: string) {
  const res = await instance.get(`/user/${username}`);
  const user = await res.data;

  return user;
}

export async function update(data, user, family) {
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
  let openData = true;
  if (data.openData === 'false') {
    openData = false;
  }
  let openDataAfterDie = true;
  if (data.openDataAfterDie === 'false') {
    openDataAfterDie = false;
  }

  let picture;
  if (data.picture.length === 0) {
    picture = user.picture;
  } else {
    picture = data.picture[0].name;
  }
  const savings = Number(data.savings);
  const res = await instance.put(`/user/${user.id}`, {
    name: data.name,
    introduction: data.introduction,
    gender: data.gender,
    alive: alive,
    birthday: data.birthday,
    job: data.job,
    savings: savings,
    picture: picture,
    age: age,
    alone: family[0],
    isMarried: family[1],
    isParents: family[2],
    isSpouseParents: family[3],
    isChild: family[4],
    isChildren2: family[5],
    isChildren3: family[6],
    isOthers: family[7],
    openData: openData,
    openDataAfterDie: openDataAfterDie,
  });

  return res.data;
}

export async function editPicture(userId, picture) {
  const res = await instance.put(`/user/${userId}`, {
    picture: picture,
  });

  return res.data;
}

export async function editTodo(userId, todoData) {
  await instance.put(`/user/${userId}/todo`, {
    goalMoney1: todoData[0],
    goalMoney2: todoData[1],
    allPercent: todoData[2],
    preparationPercent: todoData[3],
    moneyPercent: todoData[4],
    todoPercent: todoData[5],
  });
}

export async function fetchSearch(searchWord, page, gender, age, job) {
  const res: any = await instance.post(`/user/page?page=${page}&limit=20`, {
    searchWord: searchWord,
    gender: gender,
    age: age,
    job: job,
  });

  return res.data.items;
}
