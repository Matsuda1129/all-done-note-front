import React from 'react';
import Styles from './alive.module.css';

export default function Alive({ checkLogin }) {
  if (!checkLogin) {
    return null;
  } else {
    return <button className={Styles.alive}>alive</button>;
  }
}
