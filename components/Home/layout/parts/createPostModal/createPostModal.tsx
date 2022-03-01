import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { setModalFalse } from '../../../../../redux/modalSlice';
import { setTrue } from '../../../../../redux/isUseEffect';
import Styles from './createPostModal.module.css';
import { Button } from '../../../../utils';
import { postsRepository } from '../../../../../repositories';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { backfaceFixed } from '../../../../../lib/backFaceFixed';
import PictureSlider from '../../../../parts/infinitePosts/parts/pictureSlider/pictureSlider';
import { SelectPictureModal } from '../../..';

type FormValuse = {
  content: string;
};

export default function CreatePostModal() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const modal = useSelector((state: RootState) => state.modalPost);
  const [selectPictureModal, setSelectPictureModal] = useState(false);
  const [postPictures, setPostPictures] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    try {
      await dispatch(setModalFalse());
      await dispatch(setTrue());
      await backfaceFixed(false);
      await postsRepository.create(loginUser.id, data.content, postPictures);
      await setPostPictures([]);
      await reset();
      await alert('投稿しました');
    } catch (error) {
      alert('投稿できませんでした');
    }
  };

  const openSelectPictureModal = async () => {
    if (selectPictureModal) {
      await setSelectPictureModal(false);
    } else {
      await setSelectPictureModal(true);
    }
  };

  return (
    <>
      {modal.modalPost ? (
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <div className={Styles.content_inner}>
              <button
                className={Styles.batsu}
                onClick={() => {
                  dispatch(setModalFalse()),
                    backfaceFixed(false),
                    setPostPictures([]),
                    reset();
                }}
              >
                ×
              </button>
              <form onSubmit={handleSubmit(onSubmit)}>
                {errors.content && (
                  <div style={{ color: 'red' }}>{errors.content.message}</div>
                )}
                <textarea
                  {...register('content', {
                    required: '入力してください',
                    maxLength: {
                      value: 250,
                      message: '250字以内でお願いします',
                    },
                  })}
                  maxLength={250}
                  rows={5}
                  className={Styles.textarea}
                  placeholder='250字以内で入力してください'
                ></textarea>
                <div className={Styles.pictureSlider}>
                  <PictureSlider
                    path={`post/${loginUser.name}/`}
                    username={loginUser.name}
                    pictures={postPictures}
                    pictureSize1={{ width: 300, height: 200 }}
                    pictureSize2={{ width: 300, height: 200 }}
                  />
                </div>
                <div className={Styles.flexBox}>
                  <div className={Styles.pictureIcon}>
                    <Image
                      priority
                      src='/picture.jpg'
                      height={50}
                      width={50}
                      alt={'アイコン'}
                      layout={'fixed'}
                      onClick={() => openSelectPictureModal()}
                    />
                  </div>
                  <div className={Styles.postBtn}>
                    <Button type='submit'>投稿</Button>
                  </div>
                </div>
              </form>

              <div className={selectPictureModal ? null : Styles.visible}>
                <SelectPictureModal
                  path={`post/${loginUser.name}/`}
                  openSelectPictureModal={openSelectPictureModal}
                  setPostPictures={setPostPictures}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
