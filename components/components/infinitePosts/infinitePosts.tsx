import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Heart } from '../../parts';
import Styles from './infinitePosts.module.css';
import Image from 'next/image';

export default function InfinitePosts(props) {
  const user = useSelector((state: RootState) => state.users.user);

  return (
    <div>
      {props.posts.map((post) => {
        return (
          <div className={Styles.content_border} key={post.id}>
            <div className={Styles.flex_container}>
              <div className={Styles.content_flex_namebar}>
                <Image
                  className={Styles.icon}
                  priority
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}` + post.user.picture}
                  height={50}
                  width={50}
                  alt={'アイコン'}
                />
                <div className={Styles.content_name}>
                  {post.user.name},{post.id}
                </div>
              </div>
              <div className={Styles.content_content}>{post.content}</div>
            </div>
            <div className={Styles.content_bar}>
              <Heart postId={post.id} userId={user.id} />
              <div className={Styles.iconHukidashi}>50</div>
              <div className={Styles.iconRappa}>50</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
