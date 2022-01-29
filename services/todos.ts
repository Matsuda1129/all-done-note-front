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
