import instance from '../axios';

export async function findAll() {
  const res = await instance.get('information');

  return res.data;
}

export async function findGenre() {
  const res = await instance.get('information/genre');

  return res.data;
}

export async function searchInformation(
  searchGenre: string,
  searchTitle: string,
  page: number
) {
  const res: any = await instance.post(
    `information/page?page=${page}&limit=20`,
    {
      searchGenre: searchGenre,
      searchTitle: searchTitle,
    }
  );

  return res.data.items;
}
