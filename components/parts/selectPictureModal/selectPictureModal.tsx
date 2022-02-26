import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './selectPictureModal.module.css';
import { useForm } from 'react-hook-form';
import SelectPicture from './selectPicture/selectPicture';
import { RootState } from '../../../redux/store';
import { setUsers } from '../../../redux/usersSlice';
import { s3Repository, usersRepository } from '../../../repositories';

type FormValuse = {
  picture: string[];
};

export default function SelectPictureModal({
  setPostPictures,
  openSelectPictureModal,
  path,
}) {
  const dispatch = useDispatch();
  const loginUser = useSelector((state: RootState) => state.users.user);
  const [userPictures, setUserPictures] = useState(loginUser.picture);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    try {
      await reset();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPicture = async () => {
    let element: any = document.getElementById('picture');
    let pictureArray = [];
    for (let i = 0; i < element.files.length; i++) {
      pictureArray.push(element.files[i].name);
    }
    if (pictureArray.length === 0) {
      return alert('画像を選択してください');
    }
    await s3Repository.uploadPicture(element.files, loginUser.name);
    await setUserPictures([...loginUser.picture, ...pictureArray]);
    await usersRepository.editpicture(loginUser.id, [
      ...loginUser.picture,
      ...pictureArray,
    ]);
    const res = await usersRepository.find(loginUser.name);
    await dispatch(setUsers(res));
  };

  const [selectedPictures, setSelectedPictures] = useState([]);
  const [fetchPicture, setFetchPicture] = useState(false);

  useEffect(() => {
    const pictureFetch = async () => {
      try {
        setFetchPicture(false);
      } catch (error) {
        console.log(error);
      }
    };
    pictureFetch();
  }, [fetchPicture]);
  const selectPicture = async (value) => {
    await setSelectedPictures([...selectedPictures, ...[value]]);
    await setPostPictures([...selectedPictures, ...[value]]);
  };

  const unselectPicture = async (value) => {
    let result = await selectedPictures.filter(function (item) {
      return item !== value;
    });

    await setSelectedPictures(result);
    await setPostPictures(result);
  };

  const deletePicture = async () => {
    if (selectedPictures.length === 0) {
      return alert('画像を選択してください');
    }
    // await s3Repository.deletePicture(selectedPictures, loginUser.name);
    let deletedPictureArray = userPictures;
    for (let i = 0; i < selectedPictures.length; i++) {
      let result = await deletedPictureArray.filter(function (item) {
        return item !== selectedPictures[i];
      });

      deletedPictureArray = result;
    }
    if (deletedPictureArray === undefined) {
      deletedPictureArray = [];
    }
    await usersRepository.editpicture(loginUser.id, deletedPictureArray);
    const res = await usersRepository.find(loginUser.name);
    await setUserPictures(deletedPictureArray);
    await dispatch(setUsers(res));
    await setPostPictures([]);
    await setSelectedPictures([]);
    await setFetchPicture(true);
  };

  return (
    <>
      <div className={Styles.overlay}>
        <div className={Styles.content}>
          <div className={Styles.content_inner}>
            <button
              className={Styles.batsu}
              onClick={() => openSelectPictureModal()}
            >
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={Styles.flexBox}>
                {loginUser.picture.map((picture, number) => {
                  return (
                    <SelectPicture
                      path={path}
                      pictureNumber={number}
                      picture={picture}
                      key={number}
                      selectPicture={selectPicture}
                      unselectPicture={unselectPicture}
                      fetchPicture={fetchPicture}
                    />
                  );
                })}
              </div>
            </form>
            <div className={Styles.pictureBar}>
              <input
                type='file'
                multiple
                id='picture'
                className={Styles.inputFile}
              />
              <button className={Styles.button} onClick={uploadPicture}>
                アップロード
              </button>
              <button className={Styles.button} onClick={deletePicture}>
                削除
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}