import { todosRepository } from '../repositories';

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

export async function findTodoMoneyPercent1(userId: number) {
  const groupData: any = await todosRepository.findUserGroup(userId, '準備');
  let sumMoney = 0;
  for (let i = 0; i < groupData.length; i++) {
    sumMoney += groupData[i].money;
  }

  return sumMoney;
}

export async function findTodoMoneyPercent2(userId: number) {
  const groupData1: any = await todosRepository.findUserGroup(userId, 'お金');
  const groupData2: any = await todosRepository.findUserGroup(
    userId,
    'やりたいこと'
  );
  const groupData3: any = await todosRepository.findUserGroup(
    userId,
    '準備'
  );
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
