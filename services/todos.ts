import instance from '../axios';
import {
  findUserMoney,
  findUserPreparation,
  findUserTodo,
} from '../repositories/todos';

export async function findUserTodoGenre(userId: number) {
  const data: any = await findUserTodo(userId);

  let genres = [];
  for (let i = 0; i < data.length; i++) {
    genres.push(data[i].genre);
  }
  const array = [...new Set(genres)];

  return array;
}

export async function findUserMoneyGenre(userId: number) {
  const data: any = await findUserMoney(userId);

  let genres = [];
  for (let i = 0; i < data.length; i++) {
    genres.push(data[i].genre);
  }
  const array = [...new Set(genres)];

  return array;
}

export async function findUserPreparationGenre(userId: number) {
  const data: any = await findUserPreparation(userId);

  let genres = [];
  for (let i = 0; i < data.length; i++) {
    genres.push(data[i].genre);
  }
  const array = [...new Set(genres)];

  return array;
}
