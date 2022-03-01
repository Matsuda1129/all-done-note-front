import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTrue } from '../../../../../redux/isUseEffect';
import Styles from './pictureSlider.module.css';
import Image from 'next/image';
import { backfaceFixed } from '../../../../../lib/backFaceFixed';
import PictureModal from './pictureModal/pictureModal';
import SwipeableViews from 'react-swipeable-views';
import { RootState } from '../../../../../redux/store';

export default function PictureSlider({
  pictures,
  pictureSize1,
  pictureSize2,
  username,
  path,
}) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const plusIndex = async () => {
    if (pictures.length - 1 === index) {
      return;
    }
    let nextIindex = index;
    setIndex((nextIindex += 1));
  };

  const minusIndex = async () => {
    if (index === 0) {
      return;
    }
    let nextIindex = index;
    setIndex((nextIindex -= 1));
  };

  const showModal = async (value) => {
    if (modal) {
      await dispatch(setTrue());
      await backfaceFixed(false);
      await setModal(false);
    } else {
      await backfaceFixed(true);
      await setIndex(value);
      await setModal(true);
    }
  };

  const styles = {
    tabs: {
      background: '#fff',
    },
    root: {
      // padding: '0 10px',
    },
    slideContainer: {
      // width: 100
      // padding: '0 15px',
    },
    slide: {
      minHeight: 100,
      minWigth: 100,
      color: '#fff',
    },
  };

  return (
    <div>
      {pictures.length < 5 ? (
        <div className={Styles.flex_container}>
          <br />
          {pictures.map((picture, number) => {
            return (
              <div className={Styles.pictureSize} key={number}>
                <Image
                  priority
                  src={
                    `${process.env.NEXT_PUBLIC_IMAGE_URL}` +
                    `${path}` +
                    `${picture}`
                  }
                  height={pictureSize1.height}
                  width={pictureSize1.width}
                  alt={'アイコン'}
                  onClick={() => showModal(number)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className={Styles.pictureSliderPosition}>
            <div className={Styles.pictureSliderBtnPositon}>
              <button
                className={
                  index === 0 ? Styles.invisible : Styles.pictureSliderBtn
                }
                onClick={minusIndex}
                type='button'
              >
                ←
              </button>
            </div>
            <SwipeableViews
              enableMouseEvents
              style={styles.root}
              index={index}
              slideStyle={styles.slideContainer}
            >
              {pictures.map((picture, number) => {
                return (
                  <div key={number} style={Object.assign({}, styles.slide)}>
                    <br />
                    <Image
                      priority
                      src={
                        `${process.env.NEXT_PUBLIC_IMAGE_URL}` +
                        `${path}` +
                        `${picture}`
                      }
                      height={pictureSize2.height}
                      width={pictureSize2.width}
                      alt={'アイコン'}
                      onClick={() => showModal(number)}
                    />
                    <div className={Styles.numberPicture}>
                      {number + 1}/{pictures.length}
                    </div>
                  </div>
                );
              })}
            </SwipeableViews>

            <div className={Styles.pictureSliderBtnPositon}>
              <button
                className={
                  pictures.length - 1 === index
                    ? Styles.invisible
                    : Styles.pictureSliderBtn
                }
                onClick={plusIndex}
                type='button'
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      <PictureModal
        path={path}
        username={username}
        modal={modal}
        showModal={showModal}
        pictures={pictures}
        index={index}
        minusIndex={minusIndex}
        plusIndex={plusIndex}
      />
    </div>
  );
}
