import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useForm } from 'react-hook-form';
import { setUsers } from '../../../redux/usersSlice';
import Styles from './editProfileModal.module.css';
import { Button } from '../../utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { s3Repository, usersRepository } from '../../../repositories';

type FormValuse = {
  name: string;
  introduction: string;
  gender: string;
  alive: boolean;
  birthday: string;
  picture: string;
};

export default function ProfileModal({
  profileModal,
  setProfileModal,
  setUser,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    try {
      const updateData = await usersRepository.update(data, user);
      await dispatch(setUsers(updateData));
      await dispatch(() => setUser(updateData));
      alert('プロフィールを編集しました');
      await dispatch(() => showOffProfileModal());
    } catch (e) {
      alert(e);
    }
  };

  const showOffProfileModal = async () => {
    await setProfileModal(false);
  };

  if (profileModal) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button className={Styles.batsu} onClick={showOffProfileModal}>
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={Styles.flex_container}>
                {errors.name && <p>{errors.name.message}</p>}
                <label>名前</label>
                <input
                  {...register('name', {
                    required: '名前は必須項目です',
                    maxLength: {
                      value: 20,
                      message: '名前は20字以内でお願いします',
                    },
                  })}
                  defaultValue={user.name}
                  type='text'
                  placeholder='名前'
                  className={Styles.flex_container_item}
                />
                {errors.introduction && <p>{errors.introduction.message}</p>}
                <label>自己紹介</label>
                <textarea
                  rows={5}
                  {...register('introduction', {
                    required: '自己紹介は必須項目です',
                    maxLength: {
                      value: 250,
                      message: '自己紹介は250字以内でお願いします',
                    },
                  })}
                  placeholder='自己紹介'
                  defaultValue={user.introduction}
                  className={Styles.flex_container_item}
                />
                {errors.birthday && <p>{errors.birthday.message}</p>}
                <div className={Styles.flex_container_row}>
                  <label>性別</label>
                  <Select
                    {...register('gender')}
                    defaultValue={user.gender}
                    className={Styles.flex_container_item３}
                  >
                    <MenuItem value='man'>男性</MenuItem>
                    <MenuItem value='woman'>女性</MenuItem>
                    <MenuItem value='other'>その他</MenuItem>
                  </Select>
                  <label>alive</label>
                  <Select {...register('alive')} defaultValue={user.alive}>
                    <MenuItem value={'true'}>alive</MenuItem>
                    <MenuItem value={'false'}>dead</MenuItem>
                  </Select>

                  <label>誕生日</label>
                  <input
                    {...register('birthday', {
                      required: '誕生日は必須項目です',
                    })}
                    type='date'
                    defaultValue={user.birthday}
                  />
                </div>
                <input
                  {...register('picture')}
                  onChange={s3Repository.uploadPhoto}
                  type='file'
                  accept='image/png, image/jpeg'
                  className={Styles.flex_container_item}
                />
                <div className={Styles.flex_container_item}>
                  <Button type='submit'>保存する</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
