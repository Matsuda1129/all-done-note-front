import instance from '../axios';
import Cookie from 'js-cookie';
import router from 'next/router';

export async function login(email: string, password: string) {
  try {
    const res = await instance.post(`${process.env.baseURL}/user/login`, {
      email: email,
      password: password,
    });

    const jwt: any = await res.data;
    if (jwt.jwt === undefined) {
      throw 'メールドレスとパスワードを確認してください';
    }
    await Cookie.set('jwt', jwt.jwt);
    await Cookie.set('signedIn', 'true', { expires: 0.5 });
    await router.push('/home');
    await location.reload();
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string
) {
  await instance
    .post('/user/register', {
      name: name,
      email: email,
      password: password,
      alive: true,
    })
    .then(async () => {
      alert('アカウントの登録ができました');
      router.push('/login');
    })
    .catch((error) => {
      if (error) {
        return console.log(error.res.data.message);
      }
    });
}

export async function logout() {
  Cookie.remove('jwt');
  Cookie.remove('signedIn');
  alert('ログアウトしました');
  await router.push('../login');
}
