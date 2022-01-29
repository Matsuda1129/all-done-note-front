import instance from '../axios';

export async function findUserGroup(userId: number, group: string) {
  const res = await instance.post('todo/group', {
    userId: userId,
    group: group,
  });

  return res.data;
}

export async function findLists(userId: number, group: string, genre: string) {
  const res = await instance.post('todo/genre', {
    userId: userId,
    group: group,
    genre: genre,
  });

  return res.data;
}

export async function findFinishedLists(
  userId: number,
  group: string,
  genre: string,
  finished: boolean
) {
  const res = await instance.post('todo/genre/finish', {
    userId: userId,
    group: group,
    genre: genre,
    finished: finished,
  });

  return res.data;
}

export async function createOneList(data, userId: number) {
  const money = Number(data.money);
  const res = await instance.post('todo', {
    userId: userId,
    group: data.group,
    genre: data.genre,
    listname: data.listname,
    finished: false,
    lock: false,
    before_die: false,
    money: money,
    memo: data.memo,
  });

  return res.data;
}

export async function editTodo(data, id: number, userId: number) {
  const money = Number(data.money);
  await instance.put(`todo/${id}`, {
    userId: userId,
    group: data.group,
    genre: data.genre,
    listname: data.listname,
    finished: false,
    lock: false,
    before_die: false,
    money: money,
    memo: data.memo,
  });
}

export async function changeTodoFinish(list, finish) {
  const money = Number(list.money);
  await instance.put(`todo/${list.id}`, {
    userId: list.userId,
    group: list.group,
    genre: list.genre,
    listname: list.listname,
    finished: finish,
    lock: false,
    before_die: false,
    money: money,
    memo: list.memo,
  });
}

export async function deleteTodo(id: number) {
  await instance({
    method: 'delete',
    url: 'todo',
    data: {
      id: id,
    },
  });
}
