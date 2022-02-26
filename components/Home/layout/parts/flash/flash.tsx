import { useEffect, useState } from 'react';
import { flashesRepository } from '../../../../../repositories';
import Styles from './flash.module.css';
import Link from 'next/link';

export default function Flash() {
  const [flashes, setFlashes] = useState([]);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const res = await flashesRepository.find();
        await setFlashes(res);
        await setReload(true);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [reload]);

  // setInterval(() => {
  //   flashesRepository.create();
  //   setReload(false);
  // }, 60000);

  return (
    <div>
      <div className={Styles.title}>みんなの速報</div>
      <div className={Styles.container}>
        <div className={Styles.content_inner}>
          {flashes.map((flash) => {
            return (
              <div key={flash.id} className={Styles.flash}>
                <Link href={`../users/${flash.user.name}`}>
                  <a href='' className={Styles.content_name}>
                    {flash.user.name}
                  </a>
                </Link>
                {flash.message}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
