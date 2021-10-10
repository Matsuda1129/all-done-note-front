import Link from 'next/link';
import fetch from 'node-fetch';
export default function index({ users }) {
  return (
    <div>
      <h1>一覧</h1>
      <ul>
        {users.data.map((user) => {
          return (
            <li key={user.id}>
              <Link href={`/users/${user.id}`}>
                <a>{user.username}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.baseURL}/user`);
  const users = await res.json();

  return { props: { users } };
}
