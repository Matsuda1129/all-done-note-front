import React from 'react';

export default function Loader({ posts }) {
  if (posts.length === 0) {
    return <div>No Result Found</div>;
  } else {
    return <h4>Loading...</h4>;
  }
}
