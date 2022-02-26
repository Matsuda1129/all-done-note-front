import React, { useState } from 'react';
import Styles from '../styles/test.module.css';
import { s3Repository } from '../repositories';
import { slide as Menu } from 'react-burger-menu';
import { Menubar } from '../components/Home/layout/parts';
import Hamburger from 'hamburger-react';

export default function Test() {
  return (
    <div>
      <input id='a' type='checkbox' className={Styles.checkbox} />
      <label htmlFor='a' className={Styles.label}>✓</label>
    </div>
  );
}
