import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  createOneFollowers,
  countOneFollowers,
  deleteOneFollower,
  findOneFollower,
} from '../../../repositories/followers';
import { findOneUser } from '../../../repositories/users';
import Styles from './followBotton.module.css';

type user = {
  id: number;
  name: string;
  email: string;
  introduction: string;
};

export default function FollowBotton(props) {
  const [checkFollow, setCheckFollow] = useState(Boolean);
  const [countFollower, setCountFollower] = useState(Number);
  const loginUser = useSelector((state: RootState) => state.users.user);

  const changeFollower = async () => {
    if (!checkFollow) {
      try {
        await createOneFollowers(loginUser.id, props.user.id);
        const likeCount: any = await countOneFollowers(props.user.id);
        await setCountFollower(likeCount);
        await setCheckFollow(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await deleteOneFollower(loginUser.id, props.user.id);
        const likeCount: any = await countOneFollowers(props.user.id);
        setCountFollower(likeCount);
        await setCheckFollow(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const userData: user = await findOneUser(props.user.name);
        const checkFollowData: any = await findOneFollower(
          loginUser.id,
          userData.id
        );
        if (checkFollowData.length === 0) {
          setCheckFollow(false);
        } else {
          setCheckFollow(true);
        }
        const likeCount: any = await countOneFollowers(props.user.id);
        await setCountFollower(likeCount);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, []);

  if (!checkFollow) {
    return (
      <div className={Styles.flex_container}>
        <div className={Styles.countFollower}> フォロワー {countFollower}</div>
        <button onClick={changeFollower} className={Styles.follow_btn}>
          フォローする
        </button>
      </div>
    );
  } else {
    return (
      <div className={Styles.flex_container}>
        <div className={Styles.countFollower}> フォロワー {countFollower}</div>
        <button onClick={changeFollower} className={Styles.following_btn}>
          フォロ中ー
        </button>
      </div>
    );
  }
}
