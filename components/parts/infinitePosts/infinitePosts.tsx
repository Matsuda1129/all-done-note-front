import * as React from 'react';
import PostView from './parts/postView/postView';

export default function InfinitePosts({ posts }) {
  return (
    <div>
      <div style={{ border: ' 1px solid gray' }}></div>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <PostView post={post} />
          </div>
        );
      })}
    </div>
  );
}
