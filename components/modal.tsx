import React, { useState } from 'react';
import Styles from './modal.module.css';

export default function Modal2({ show, setShow, content }) {
  if (show) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <p>{content}</p>
            <p>
              <button onClick={() => setShow(false)}>Close</button>
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
