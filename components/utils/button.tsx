import * as React from 'react';
import Styles from './button.module.css';


const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return <button className={Styles.button} {...props} />;
};

export default Button;
