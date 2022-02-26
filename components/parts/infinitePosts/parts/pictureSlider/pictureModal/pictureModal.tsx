import React, { useState } from 'react';
import Styles from './pictureModal.module.css';
import SwipeableViews from 'react-swipeable-views';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';

export default function PictureModal({
  modal,
  showModal,
  index,
  pictures,
  minusIndex,
  plusIndex,
  username,
  path,
}) {
  const styles = {
    tabs: {
      background: '#fff',
    },
    root: {
      padding: '0 10px',
    },
    slideContainer: {
      padding: '0 10px',
    },
    slide: {
      minHeight: 100,
      minWigth: 100,
      color: '#fff',
    },
  };

  if (modal) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button className={Styles.batsu} onClick={showModal}>
              ×
            </button>

            <div className={Styles.flexBox}>
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
                    <div
                      key={number}
                      style={Object.assign({}, styles.slide)}
                      className={Styles.image}
                    >
                      <Image
                        priority
                        src={
                          `${process.env.NEXT_PUBLIC_IMAGE_URL}` +
                          `${path}${picture}`
                        }
                        height={1000}
                        width={1500}
                        alt={'アイコン'}
                        objectFit='contain'
                      />
                      <div>
                        <div className={Styles.numberPicture}>
                          {number + 1}/{pictures.length}
                        </div>
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
        </div>
      </div>
    );
  } else {
    return null;
  }
}
