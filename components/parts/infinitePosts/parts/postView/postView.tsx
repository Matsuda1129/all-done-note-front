import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Heart } from '../../..';
import Image from 'next/image';
import Styles from './postView.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import EditBtn from '../editBtn/editBtn';
import { commentRepository } from '../../../../../repositories';
import { setTrue } from '../../../../../redux/isUseEffect';
import PictureSlider from '../pictureSlider/pictureSlider';

export default function PostView({ post }) {
  const loginUser = useSelector((state: RootState) => state.users.user);
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );
  const [commentCount, setCommentCount] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const firstFetch = async () => {
      try {
        const commentCountData: any = await commentRepository.count(post.id);
        await setCommentCount(commentCountData);
        await dispatch(setTrue);
      } catch (error) {
        console.log(error);
      }
    };

    firstFetch();
  }, [post.id, isUseEffect, dispatch]);

  return (
    <div className={Styles.border}>
      <div className={Styles.flex_container}>
        <div className={Styles.namebar}>
          <Image
            className={Styles.triming}
            priority
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}` + post.user.icon}
            height={50}
            width={50}
            alt={'アイコン'}
            layout={'fixed'}
          />
          <div className={Styles.name}>
            <Link href={`../users/${post.user.name}`}>
              <a href=''>
                {post.user.name},{post.id}
              </a>
            </Link>
          </div>
          <EditBtn post={post} />
        </div>
        <Link href={`../posts/${post.id}`}>
          <a href=''>
            <div className={Styles.content}>{post.content}</div>
          </a>
        </Link>
      </div>
      <PictureSlider
        path={`post/${loginUser.name}/`}
        pictures={post.picture}
        pictureSize1={{ width: 300, height: 200 }}
        pictureSize2={{ width: 600, height: 400 }}
        username={post.user.name}
      />
      <div className={Styles.icon_bar}>
        <div className={Styles.heart_position}>
          <Heart postId={post.id} userId={loginUser.id} />
        </div>

        <Link href={`../posts/${post.id}`}>
          <a href=''>
            <div className={Styles.iconHukidashi}>{commentCount}</div>
          </a>
        </Link>
      </div>
    </div>
  );
}
