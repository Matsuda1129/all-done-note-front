import { GetStaticPaths } from 'next';
import fetch from 'node-fetch';
export default function post({ users }) {
  return (
    <div>
      <h1>POST(投稿){users.id}</h1>
      <h2>{users.username}</h2>
      <p>{users.email}</p>
    </div>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.baseURL}/user`);
  const users = await res.json();
  const paths = users.data.map((user) => `/users/${user.id}`);

  return {
    paths,
    fallback: false,
  };
};
export async function getStaticProps({ params }) {
  const id = params.user;
  const res = await fetch(`${process.env.baseURL}/user/${id}`);
  const users = await res.json();
  if (!Object.keys(users).length) {
    return {
      notFound: true,
    };
  }

  return { props: { users } };
}
