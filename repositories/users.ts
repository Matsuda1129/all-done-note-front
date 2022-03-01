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

export async function checkPassword(id: string, password: string) {
  const res = await instance.post('/user/checkPassword', {
    id: id,
    password: password,
  });

  return res;
}

export async function update(data, user) {
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

  let openData = true;
  if (data.openData === 'false') {
    openData = false;
  }
  let openDataAfterDie = true;
  if (data.openDataAfterDie === 'false') {
    openDataAfterDie = false;
  }

  let icon;
  if (data.icon.length === 0) {
    icon = user.icon;
  } else {
    icon = data.icon[0].name;
  }
  const savings = Number(data.savings);
  const res = await instance.put(`/user/${user.id}`, {
    introduction: data.introduction,
    gender: data.gender,
    birthday: data.birthday,
    job: data.job,
    savings: savings,
    icon: icon,
    age: age,
    alone: data.alone,
    isMarried: data.isMarried,
    isParents: data.isParents,
    isSpouseParents: data.isSpouseParents,
    isChild: data.isChild,
    isChildren2: data.isChildren2,
    isChildren3: data.isChildren3,
    isOthers: data.isOthers,
    openData: openData,
    openDataAfterDie: openDataAfterDie,
  });

  return res.data;
}

export async function editAlive(userId, alive) {
  const res = await instance.put(`/user/${userId}/alive`, {
    alive: alive,
  });

  return res.data;
}

export async function editWill(userId, will) {
  const res = await instance.put(`/user/${userId}/will`, {
    will: will,
  });

  return res.data;
}

export async function editpicture(userId, picture) {
  const res = await instance.put(`/user/${userId}/picture`, {
    picture: picture,
  });

  return res.data;
}

export async function editTodo(userId, todoData) {
  await instance.put(`/user/${userId}/todo`, {
    goalMoney1: todoData.goalMoney1,
    goalMoney2: todoData.goalMoney2,
    goalMoney1Percent: todoData.goalMoneyPercent1,
    goalMoney2Percent: todoData.goalMoneyPercent2,
    allPercent: todoData.allPercentData,
    preparationPercent: todoData.preparationPercentData,
    moneyPercent: todoData.moneyPercentData,
    todoPercent: todoData.todoPercentData,
  });
}

export async function fetchSearch(
  searchWord,
  page,
  gender,
  age,
  job,
  alive,
  family
) {
  if (alive === 'false') {
    alive = false;
  }
  if (alive === 'true') {
    alive = true;
  }
  const res: any = await instance.post(`/user/page?page=${page}&limit=20`, {
    searchWord: searchWord,
    gender: gender,
    alive: alive,
    age: age,
    job: job,
    alone: family.alone,
    isMarried: family.isMarried,
    isParents: family.isParents,
    isSpouseParents: family.isSpouseParents,
    isChild: family.isChild,
    isChildren2: family.isChildren2,
    isChildren3: family.isChildren3,
    isOthers: family.isOthers,
  });

  return res.data.items;
}

export async function dataAnalize(gender, age, job, alive, family) {
  if (alive === 'false') {
    alive = false;
  }
  if (alive === 'true') {
    alive = true;
  }
  const res: any = await instance.post(`/user/dataAnalize`, {
    gender: gender,
    alive: alive,
    age: age,
    job: job,
    alone: family.alone,
    isMarried: family.isMarried,
    isParents: family.isParents,
    isSpouseParents: family.isSpouseParents,
    isChild: family.isChild,
    isChildren2: family.isChildren2,
    isChildren3: family.isChildren3,
    isOthers: family.isOthers,
  });

  return res.data;
}
