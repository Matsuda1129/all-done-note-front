export default function DisplayEnv() {
  console.log(process.env.NEXT_PUBLIC_FAVORITE_POKEMON);

  return <div>{process.env.NEXT_PUBLIC_FAVORITE_POKEMON}</div>;
}
