import { usersRepository } from '.';
import instance from '../axios';

export async function findSendMail(userId: number) {
  const res = await instance.get(`mail/send/${userId}`);

  return res.data;
}

export async function findRecievedMail(recipientId: number) {
  const res = await instance.get(`mail/recieved/${recipientId}`);

  return res.data;
}

export async function create(
  userId: number,
  address: string,
  title: string,
  message: string
) {
  const recipientData: any = await usersRepository.find(address);
  await instance.post('mail', {
    ownerId: userId,
    userId: userId,
    recipientId: recipientData.id,
    title: title,
    message: message,
    unread: false,
    userDelete: false,
    recipientDelete: false,
  });

  await instance.post('mail', {
    ownerId: recipientData.id,
    userId: userId,
    recipientId: recipientData.id,
    title: title,
    message: message,
    unread: false,
    userDelete: false,
    recipientDelete: false,
  });
}

export async function findById(id: number) {
  const res = await instance.get(`mail/${id}`);

  return res.data;
}

export async function onUnread(data) {
  await instance.put(`mail/${data.id}/unread`, {
    unread: true,
  });
}

export async function changeUnread(data) {
  if (data.unread) {
    await instance.put(`mail/${data.id}/unread`, {
      unread: false,
    });
  } else {
    await instance.put(`mail/${data.id}/unread`, {
      unread: true,
    });
  }
}

export async function deleteOne(id: number) {
  await instance.delete(`mail/delete/${id}`);
}
