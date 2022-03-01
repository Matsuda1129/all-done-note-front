import React, { useEffect, useState } from 'react';
import { followersRepository } from '../../../repositories';

export default function CountFollowing({ userId }) {
  const [countFollowing, setCountFollowing] = useState();
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const countFollowingData: any =
          await followersRepository.countFollowing(userId);
        setCountFollowing(countFollowingData);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  });

  return <div> フォロー中 {countFollowing}</div>;
}
