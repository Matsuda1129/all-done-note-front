import React, { useState } from 'react';
import Avatar from 'react-avatar';

export default function DisplayEnv({ pokemon }) {
  return <div>{pokemon}</div>;
}

export async function getStaticProps() {
  return {
    props: {
      pokemon: process.env.FAVORITE_POKEMON,
    },
  };
}
