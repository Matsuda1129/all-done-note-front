import { todosRepository, usersRepository } from '../repositories';

export async function findUserGenre(userId: number, group: string) {
  const data: any = await todosRepository.findUserGroup(userId, group);

  let genres = [];
  for (let i = 0; i < data.length; i++) {
    genres.push(data[i].genre);
  }
  const array = [...new Set(genres)];

  return array;
}

export async function findTodoPercent(userId: number, group: string) {
  const groupData: any = await todosRepository.findUserGroup(userId, group);

  let countFinished = 0;
  for (let i = 0; i < groupData.length; i++) {
    if (groupData[i].finished === true) {
      countFinished += 1;
    }
  }

  const percent = await Math.floor((countFinished / groupData.length) * 100);

  return percent;
}

export async function findTodoMoney1(userId: number) {
  const groupData: any = await todosRepository.findUserGroup(userId, '準備');
  let sumMoney = 0;
  for (let i = 0; i < groupData.length; i++) {
    sumMoney += groupData[i].money;
  }

  return sumMoney;
}

export async function findTodoMoney2(userId: number) {
  const groupData1: any = await todosRepository.findUserGroup(userId, 'お金');
  const groupData2: any = await todosRepository.findUserGroup(
    userId,
    'やりたいこと'
  );
  const groupData3: any = await todosRepository.findUserGroup(userId, '準備');
  let sumMoney = 0;
  for (let i = 0; i < groupData1.length; i++) {
    sumMoney += groupData1[i].money;
  }
  for (let i = 0; i < groupData2.length; i++) {
    sumMoney += groupData2[i].money;
  }
  for (let i = 0; i < groupData3.length; i++) {
    sumMoney += groupData3[i].money;
  }

  return sumMoney;
}

export async function findTodoAllPercent(username: string) {
  const userData: any = await usersRepository.find(username);
  const preparationPercentData = await findTodoPercent(userData.id, '準備');
  const moneyPercentData = await findTodoPercent(userData.id, 'お金');
  const todoPercentData = await findTodoPercent(userData.id, 'やりたいこと');

  const todoMoney1 = await findTodoMoney1(userData.id);
  const todoPercentMoney1 = await Math.floor(
    (userData.savings / todoMoney1) * 100
  );

  const todoMoney2 = await findTodoMoney2(userData.id);

  const todoPercentMoney2 = await Math.floor(
    (userData.savings / todoMoney2) * 100
  );

  let goalMoneyPercent1;
  if (todoPercentMoney1 > 100) {
    goalMoneyPercent1 = 100;
  } else {
    goalMoneyPercent1 = todoPercentMoney1;
  }

  let goalMoneyPercent2;
  if (todoPercentMoney2 > 100) {
    goalMoneyPercent2 = 100;
  } else {
    goalMoneyPercent2 = todoPercentMoney2;
  }

  const allPercentData = Math.round(
    (moneyPercentData + preparationPercentData + todoPercentData) / 3
  );
  const data = {
    goalMoney1: todoMoney1,
    goalMoney2: todoMoney2,
    goalMoneyPercent1: goalMoneyPercent1,
    goalMoneyPercent2: goalMoneyPercent2,
    allPercentData: allPercentData,
    preparationPercentData: preparationPercentData,
    moneyPercentData: moneyPercentData,
    todoPercentData: todoPercentData,
  };

  return data;
}

export async function checkOpenData(username, loginUserId) {
  const userData: any = await usersRepository.find(username);
  let checkOpenData;
  if (userData.id === loginUserId) {
    checkOpenData = true;
  } else if (userData.alive) {
    if (userData.openData) {
      checkOpenData = true;
    } else {
      checkOpenData = false;
    }
  } else if (!userData.alive) {
    if (userData.openDataAfterDie) {
      checkOpenData = true;
    } else {
      checkOpenData = false;
    }
  }

  return checkOpenData;
}
