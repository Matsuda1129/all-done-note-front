import axios from 'axios';
import Cookies from 'js-cookie';
const jwt = Cookies.get('jwt');
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_baseURL}`,
  headers: {
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export default instance;
