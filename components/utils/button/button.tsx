import * as React from 'react';
import Styles from './button.module.css';

export default function Button(props) {
  return <button type='submit' className={Styles.button} {...props} />;
}
