import Iamge from 'next/image';
import { useState } from 'react';
import createAP from '../styles/createAP.module.css';
import Modal from '../components/modal';

export default function CreateAccountPage() {
  const [show, setShow] = useState(false);

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
      <Modal show={show} setShow={setShow} content="Appから内容を変更できます"/>
      <button onClick={() => setShow(true)}>Click</button>
    </div>
  );
}