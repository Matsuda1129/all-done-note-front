import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../../../redux/usersSlice';
import { usersService } from '../../../services';
import { Button } from '../../utils';

export default function Logout({ checkLogin }) {
  const dispatch = useDispatch();
  const logout = async () => {
    await dispatch(reset());
    await usersService.logout();
  };
  if (!checkLogin) {
    return null;
  } else {
    return <Button onClick={logout}>ログアウト</Button>;
  }
}
