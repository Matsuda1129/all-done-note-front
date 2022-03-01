import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrue } from '../../../redux/isUseEffect';
import { RootState } from '../../../redux/store';
import { followersRepository } from '../../../repositories';
import Styles from './followBotton.module.css';

export default function FollowButton({ userId }) {
  const dispatch = useDispatch();
  const [checkFollow, setCheckFollow] = useState(false);
  const loginUser = useSelector((state: RootState) => state.users.user);

  const changeFollower = async () => {
    if (!checkFollow) {
      try {
        await followersRepository.create(loginUser.id, userId);
        await setCheckFollow(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await followersRepository.deleteOne(loginUser.id, userId);
        await setCheckFollow(false);
      } catch (error) {
        console.log(error);
      }
    }
    await dispatch(setTrue());
  };

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const checkFollowData: any = await followersRepository.findFollower(
          loginUser.id,
          userId
        );
        if (checkFollowData === undefined || checkFollowData.length === 0) {
          setCheckFollow(false);
        } else {
          setCheckFollow(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [loginUser.id, userId]);

  if (!checkFollow) {
    return (
      <div className={Styles.flex_container}>
        <button onClick={changeFollower} className={Styles.follow_btn}>
          フォローする
        </button>
      </div>
    );
  } else {
    return (
      <div className={Styles.flex_container}>
        <button onClick={changeFollower} className={Styles.following_btn}>
          フォロ中ー
        </button>
      </div>
    );
  }
}
