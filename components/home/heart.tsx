import { useEffect, useState } from 'react';
import Styles from './heart.module.css';
import {
  countOneLike,
  createOneLike,
  deleteOneLike,
  findOneLike,
} from '../../repositories/likes';

export default function Heart({ userId, postId }) {
  const [likeCheck, setLikeCheck] = useState(Boolean);
  const [likeCount, setLikeCount] = useState(Number);
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likeData = await findOneLike(postId, userId);
        const likeCount: any = await countOneLike(postId);
        await setLikeCount(likeCount);

        if (!likeData) {
          await setLikeCheck(false);
        } else {
          await setLikeCheck(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikes();
  }, [likeCheck, postId, userId]);

  const changeLike = async () => {
    if (!likeCheck) {
      try {
        await createOneLike(postId, userId);
        const likeCount: any = await countOneLike(postId);
        await setLikeCount(likeCount);
        setLikeCheck(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await deleteOneLike(postId, userId);
        const likeCount: any = await countOneLike(postId);
        setLikeCount(likeCount);
        setLikeCheck(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!likeCheck) {
    return (
      <div>
        <button className={Styles.offHeart} onClick={changeLike}></button>
        <div className={Styles.likesCount}>{likeCount}</div>
      </div>
    );
  } else {
    return (
      <div>
        <button className={Styles.heart} onClick={changeLike}></button>
        <div className={Styles.likesCount}>{likeCount}</div>
      </div>
    );
  }
}
