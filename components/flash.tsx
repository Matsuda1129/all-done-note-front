import Image from 'next/image';
import Styles from './flash.module.css';

export default function Flash() {
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>みんなの速報</div>
      <div className={Styles.flashs}>お金の達成率が６０％になりました</div>
      <div className={Styles.flashs}>お金の達成率が６０％になりました</div>
      <div className={Styles.flashs}>お金の達成率が６０％になりました</div>
      <div className={Styles.flashs}>お金の達成率が６０％になりました</div>
    </div>
  );
}
