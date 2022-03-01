import React, { useEffect, useState } from 'react';
import Styles from './editPostModal.module.css';
import { Button } from '../../../../../utils';
import { postsRepository } from '../../../../../../repositories';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { backfaceFixed } from '../../../../../../lib/backFaceFixed';
import PictureSlider from '../../pictureSlider/pictureSlider';
import { RootState } from '../../../../../../redux/store';
import Image from 'next/image';
import { SelectPictureModal } from '../../../..';

type FormValuse = {
  content: string;
};

export default function EditPostModal({ modal, showModal, post }) {
  const loginUser = useSelector((state: RootState) => state.users.user);
  const [selectPictureModal, setSelectPictureModal] = useState(false);
  const [postPictures, setPostPictures] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  useEffect(() => {
    const firstFetch = async () => {
      try {
        await setPostPictures(post.picture);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [post.picture]);

  const onSubmit = async (data) => {
    try {
      await postsRepository.update(post.id, data.content, postPictures);
      await alert('編集しました');
      await backfaceFixed(false);
      await showModal(false);
    } catch (error) {
      alert('編集できませんでした');
    }
  };

  const openSelectPictureModal = async () => {
    if (selectPictureModal) {
      await setSelectPictureModal(false);
    } else {
      await setSelectPictureModal(true);
    }
  };
  if (modal) {
    return (
      <div className={Styles.overlay}>
        <div className={Styles.content}>
          <div className={Styles.content_inner}>
            <button
              className={Styles.batsu}
              onClick={() => {
                showModal(false), backfaceFixed(false), setPostPictures([]);
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
                defaultValue={post.content}
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
    );
  } else {
    return null;
  }
}
