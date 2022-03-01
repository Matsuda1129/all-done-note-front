import React, { useEffect, useState } from 'react';
import { followersRepository } from '../../../repositories';

export default function CountFollower({ userId }) {
  const [countFollower, setCountFollower] = useState();
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const countFollowers: any = await followersRepository.countFollowers(
          userId
        );
        setCountFollower(countFollowers);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  });

  return <div> フォロワー {countFollower}</div>;
}
