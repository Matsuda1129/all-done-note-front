import { useState } from 'react';
import createAP from '../styles/createAP.module.css';

export default function CreateAccountPage() {
  return (
    <div>
      <div className={createAP.grid_container}>
        <div className={createAP.item_A}>A</div>
        <div className={createAP.item_B}>B</div>
        <div className={createAP.item_C}>C</div>
        <div className={createAP.item_D}>D</div>
        <div className={createAP.item_E}>E</div>
        <div className={createAP.item_F}>F</div>
        <div className={createAP.item_G}>G</div>
      </div>
    </div>
  );
}
