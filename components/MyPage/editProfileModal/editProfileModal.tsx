import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useForm } from 'react-hook-form';
import { setUsers } from '../../../redux/usersSlice';
import Styles from './editProfileModal.module.css';
import { Button } from '../../utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { s3Repository, usersRepository } from '../../../repositories';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import { useEffect, useState } from 'react';

type FormValuse = {
  name: string;
  introduction: string;
  gender: string;
  alive: boolean;
  birthday: string;
  picture: string;
  savings: number;
  job: string;
  alone: boolean;
  isMarried: boolean;
  isParents: boolean;
  isSpouseParents: boolean;
  isChild: boolean;
  isChildren2: boolean;
  isChildren3: boolean;
  isOthers: boolean;
  openData: boolean;
  openDataAfterDie: boolean;
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

  const [alone, setAlone] = useState(user.alone);
  const [isMarried, setIsMarried] = useState(user.isMarried);
  const [isParents, setIsParents] = useState(user.isParents);
  const [isSpouseParents, setIsSpouseParents] = useState(user.isSpouseParents);
  const [isChild, setIsChild] = useState(user.isChild);
  const [isChildren2, setIsChildren2] = useState(user.isChildren2);
  const [isChildren3, setIsChildren3] = useState(user.isChildren3);
  const [isOthers, setIsOthers] = useState(user.isOthers);
  const [familyeErrorMessage, setFamilyErrorMessage] = useState(String);

  useEffect(() => {
    const checkFamily = async () => {
      try {
        if (alone) {
          if (
            isMarried === true ||
            isParents === true ||
            isSpouseParents === true ||
            isChild === true ||
            isChildren2 === true ||
            isChildren3 === true ||
            isOthers === true
          ) {
            setFamilyErrorMessage(
              '一人暮らしが選択されています、他の選択肢を外してください'
            );

            return;
          }
        }
        if (
          (isChild && isChildren2) ||
          (isChild && isChildren3) ||
          (isChildren2 && isChildren3) ||
          (isChild && isChildren2 && isChildren3)
        ) {
          setFamilyErrorMessage('子供の選択肢が複数選ばれています');

          return;
        }

        setFamilyErrorMessage('');
      } catch (error) {
        console.log(error);
      }
    };
    checkFamily();
  }, [
    alone,
    isChild,
    isChildren2,
    isChildren3,
    isMarried,
    isOthers,
    isParents,
    isSpouseParents,
  ]);

  const handleCheckboxClick = async (e, set) => {
    if (e === true) {
      await set(false);
    } else {
      await set(true);
    }
  };
  const onSubmit = async (data) => {
    try {
      setFamilyErrorMessage('');
      const updateData = await usersRepository.update(data, user);
      await backfaceFixed(false);
      await dispatch(setUsers(updateData));
      await dispatch(() => setUser(updateData));
      alert('プロフィールを編集しました');
      await dispatch(() => showOffProfileModal());
    } catch (e) {
      alert(e);
    }
  };

  const showOffProfileModal = async () => {
    await backfaceFixed(false);
    await setProfileModal(false);
  };

  if (profileModal) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <div className={Styles.content_inner}>
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
                  <label>性別</label>
                  <Select
                    {...register('gender')}
                    defaultValue={user.gender}
                    className={Styles.flex_container_item2}
                  >
                    <MenuItem value='man'>男性</MenuItem>
                    <MenuItem value='woman'>女性</MenuItem>
                    <MenuItem value='other'>その他</MenuItem>
                  </Select>
                  {errors.savings && <p>{errors.savings.message}</p>}
                  <label>貯金額</label>
                  <input
                    {...register('savings')}
                    defaultValue={user.savings}
                    type='number'
                    placeholder='貯金額'
                    className={Styles.flex_container_item}
                  />
                  <label>業種</label>
                  <Select
                    {...register('job')}
                    defaultValue={user.job}
                    className={Styles.flex_container_item}
                  >
                    <MenuItem value=''>未選択</MenuItem>
                    <MenuItem value='農林業・水産業・鉱業'>
                      農林業・水産業・鉱業
                    </MenuItem>
                    <MenuItem value='建設・土木・工業'>
                      建設・土木・工業
                    </MenuItem>
                    <MenuItem value='電子部品・デバイス・電子回路製造業'>
                      電子部品・デバイス・電子回路製造業
                    </MenuItem>
                    <MenuItem value='情報通信機械器具製造業'>
                      情報通信機械器具製造業
                    </MenuItem>
                    <MenuItem value='その他製造業'>その他製造業</MenuItem>
                    <MenuItem value='電気・ガス・熱供給・水道業'>
                      電気・ガス・熱供給・水道業
                    </MenuItem>
                    <MenuItem value='通信業'>通信業</MenuItem>
                    <MenuItem value='情報サービス業'>情報サービス業</MenuItem>
                    <MenuItem value='その他の情報通信業'>
                      その他の情報通信業
                    </MenuItem>
                    <MenuItem value='運輸業・郵便業'>運輸業・郵便業</MenuItem>
                    <MenuItem value='卸売業・小売業'>卸売業・小売業</MenuItem>
                    <MenuItem value='金融業・保険業'>金融業・保険業</MenuItem>
                    <MenuItem value='不動産業・物品賃貸業'>
                      不動産業・物品賃貸業
                    </MenuItem>
                    <MenuItem value='学術研究・専門技術者'>
                      学術研究・専門技術者
                    </MenuItem>
                    <MenuItem value='宿泊業・飲食サービス業'>
                      宿泊業・飲食サービス業
                    </MenuItem>
                    <MenuItem value='生活関連サービス業・娯楽業'>
                      生活関連サービス業・娯楽業
                    </MenuItem>
                    <MenuItem value='教育・学習支援業'>
                      教育・学習支援業
                    </MenuItem>
                    <MenuItem value='医療・福祉業'>医療・福祉業</MenuItem>
                    <MenuItem value='複合サービス業'>複合サービス業</MenuItem>
                    <MenuItem value='その他サービス業'>
                      その他サービス業
                    </MenuItem>
                  </Select>
                  <label>家族構成</label>
                  <div className={Styles.error_message}>
                    {familyeErrorMessage}
                  </div>
                  <div className={Styles.flex_family}>
                    <label htmlFor=''>
                      <input
                        {...register('alone')}
                        checked={alone}
                        onChange={() => handleCheckboxClick(alone, setAlone)}
                        type='checkbox'
                      />
                      一人暮らし
                    </label>
                    <label htmlFor=''>
                      <input
                        {...register('isMarried')}
                        checked={isMarried}
                        onChange={() =>
                          handleCheckboxClick(isMarried, setIsMarried)
                        }
                        type='checkbox'
                      />
                      配偶者
                    </label>
                    <label htmlFor=''>
                      <input
                        {...register('isParents')}
                        checked={isParents}
                        onChange={() =>
                          handleCheckboxClick(isParents, setIsParents)
                        }
                        type='checkbox'
                      />
                      ご自身の親
                    </label>
                    <label htmlFor=''>
                      <input
                        {...register('isSpouseParents')}
                        checked={isSpouseParents}
                        onChange={() =>
                          handleCheckboxClick(
                            isSpouseParents,
                            setIsSpouseParents
                          )
                        }
                        type='checkbox'
                      />
                      配偶者の親
                    </label>
                    <label htmlFor=''>
                      <input
                        {...register('isChild')}
                        checked={isChild}
                        onChange={() =>
                          handleCheckboxClick(isChild, setIsChild)
                        }
                        type='checkbox'
                      />
                      子供
                    </label>
                    <label htmlFor=''>
                      <input
                        {...register('isChildren2')}
                        checked={isChildren2}
                        onChange={() =>
                          handleCheckboxClick(isChildren2, setIsChildren2)
                        }
                        type='checkbox'
                      />
                      子供２人
                    </label>
                    <label htmlFor=''>
                      <input
                        {...register('isChildren3')}
                        checked={isChildren3}
                        onChange={() =>
                          handleCheckboxClick(isChildren3, setIsChildren3)
                        }
                        type='checkbox'
                      />
                      子供３人以上
                    </label>
                    <label htmlFor=''>
                      <input
                        {...register('isOthers')}
                        checked={isOthers}
                        onChange={() =>
                          handleCheckboxClick(isOthers, setIsOthers)
                        }
                        className='checks'
                        type='checkbox'
                      />
                      その他家族
                    </label>
                  </div>

                  <label>alive</label>
                  <Select
                    {...register('alive')}
                    defaultValue={user.alive}
                    className={Styles.flex_container_item2}
                  >
                    <MenuItem value={'true'}>alive</MenuItem>
                    <MenuItem value={'false'}>dead</MenuItem>
                  </Select>

                  <label>情報公開</label>
                  <Select
                    {...register('openData')}
                    defaultValue={user.openData}
                    className={Styles.flex_container_item2}
                  >
                    <MenuItem value={'true'}>公開</MenuItem>
                    <MenuItem value={'false'}>非公開</MenuItem>
                  </Select>

                  <label>死後の情報公開</label>
                  <Select
                    {...register('openDataAfterDie')}
                    defaultValue={user.openDataAfterDie}
                    className={Styles.flex_container_item2}
                  >
                    <MenuItem value={'true'}>公開</MenuItem>
                    <MenuItem value={'false'}>非公開</MenuItem>
                  </Select>

                  {errors.birthday && <p>{errors.birthday.message}</p>}
                  <label>誕生日</label>
                  <input
                    {...register('birthday', {
                      required: '誕生日は必須項目です',
                    })}
                    className={Styles.flex_container_item3}
                    type='date'
                    defaultValue={user.birthday}
                  />
                </div>
                <input
                  {...register('picture')}
                  onChange={s3Repository.uploadPhoto}
                  type='file'
                  accept='image/png, image/jpeg'
                  className={Styles.flex_container_item3}
                />

                <div className={Styles.error_message}>
                  {familyeErrorMessage}
                </div>
                <div className={Styles.flex_container_item}>
                  <Button type='submit'>保存する</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
