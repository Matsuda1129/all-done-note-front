import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { likesRepository } from '../../../repositories';
import Styles from './heart.module.css';

export default function Heart({ userId, postId }) {
  const [likeCheck, setLikeCheck] = useState(Boolean);
  const [likeCount, setLikeCount] = useState(Number);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        if (userId !== null) {
          const likeData = await likesRepository.find(postId, userId);
          if (!likeData) {
            await setLikeCheck(false);
          } else {
            await setLikeCheck(true);
          }
        }
        const likeCount: any = await likesRepository.count(postId);
        await setLikeCount(likeCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLikes();
  }, [likeCheck, postId, userId]);

  const changeLike = async () => {
    if (!likeCheck) {
      try {
        await likesRepository.create(postId, userId);
        const likeCount: any = await likesRepository.count(postId);
        await setLikeCount(likeCount);
        setLikeCheck(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await likesRepository.deleteOne(postId, userId);
        const likeCount: any = await likesRepository.count(postId);
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
