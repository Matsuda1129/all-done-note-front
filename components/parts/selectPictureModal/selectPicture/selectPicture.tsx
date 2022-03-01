import React, { useEffect, useState } from 'react';
import Styles from './selectPicture.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

export default function SelectPicture({
  picture,
  selectPicture,
  pictureNumber,
  unselectPicture,
  fetchPicture,
  path,
}) {
  const loginUser = useSelector((state: RootState) => state.users.user);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const pictureFetch = async () => {
      try {
        setCheck(false);
      } catch (error) {
        console.log(error);
      }
    };
    pictureFetch();
  }, [fetchPicture]);

  const changeBox = async (value) => {
    if (check) {
      await unselectPicture(value);
      await setCheck(false);
    } else {
      await selectPicture(value);
      await setCheck(true);
    }
  };

  return (
    <div>
      {!check ? (
        <div>
          <div className={Styles.invisible}>
            <input
              type='checkbox'
              checked={check}
              id={pictureNumber}
              style={{ display: 'none' }}
              onChange={() => changeBox(`${picture}`)}
            />
            <label htmlFor={pictureNumber} className={Styles.invisible}>
              ✓
            </label>
          </div>
          <div className={Styles.picture}>
            <Image
              onClick={() => changeBox(`${picture}`)}
              priority
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}` + `${path}${picture}`}
              height={200}
              width={200}
              alt={'アイコン'}
            />
          </div>
        </div>
      ) : (
        <div>
          <div className={Styles.checkbox}>
            <input
              type='checkbox'
              checked={check}
              id={pictureNumber}
              style={{ display: 'none' }}
              onChange={() => changeBox(`${picture}`)}
            />
            <label htmlFor={pictureNumber} className={Styles.label}>
              ✓
            </label>
          </div>
          <div className={Styles.picture2}>
            <Image
              onClick={() => changeBox(`${picture}`)}
              priority
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}` + `${path}${picture}`}
              height={200}
              width={200}
              alt={'アイコン'}
            />
          </div>
        </div>
      )}
    </div>
  );
}
