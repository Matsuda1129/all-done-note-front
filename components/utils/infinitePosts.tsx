import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Heart from '../home/heart';
import Styles from './infiniteLikes.module.css';

export default function InfinitePosts(props) {
  const user = useSelector((state: RootState) => state.users.user);

  return (
    <div>
      {props.posts.map((post) => {
        return (
          <div className={Styles.content_border} key={post.id}>
            <div className={`${Styles.content_name} ${Styles.iconTree}`}>
              {post.user.name},{post.id}
            </div>
            <div className={Styles.content_content}>{post.content}</div>
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
