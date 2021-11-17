import { GetStaticPaths, GetStaticProps } from 'next';
import fetch from 'node-fetch';
export default function user({
  userData,
}: {
  userData: {
    id: string;
    name: string;
    email: string;
  };
}) {
  return (
    <div>
      <h1>User(情報){userData.id}</h1>
      <h2>{userData.name}</h2>
      <p>{userData.email}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

type StaticProps = { params: { user: string } };

export const getStaticProps: GetStaticProps = async ({
  params,
}: StaticProps) => {
  const id = params.user;
  const res = await fetch(`${process.env.baseURL}/user/${id}`);
  const userData = await res.json();

  try {
    await fetchWithErrorHandling(`${process.env.baseURL}/user/${id}`);
  } catch (error) {
    console.log('error');

    return {
      notFound: true,
    };
  }

  return {
    props: { userData },
    revalidate: 60,
  };
};

const handleErrors = (res) => {
  if (res.ok) {
    return res;
  }

  switch (res.status) {
    case 400:
      throw Error('INVALID_TOKEN');
    case 401:
      throw Error('UNAUTHORIZED');
    case 500:
      throw Error('INTERNAL_SERVER_ERROR');
    case 502:
      throw Error('BAD_GATEWAY');
    case 404:
      throw Error('NOT_FOUND');
    default:
      throw Error('UNHANDLED_ERROR');
  }
};

const fetchWithErrorHandling = (url) =>
  fetch(url)
    .catch((error) => {
      throw Error(error);
    })
    .then(handleErrors)
    .then((res) => res.json());
