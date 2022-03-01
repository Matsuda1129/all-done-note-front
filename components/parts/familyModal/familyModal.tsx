import Styles from './familyModal.module.css';
import { backfaceFixed } from '../../../lib/backFaceFixed';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function FamilyModal({
  familyModal,
  setFamilyModal,
  setFamily,
}) {
  type FormValuse = {
    alone: Boolean;
    isMarried: Boolean;
    isParents: Boolean;
    isSpouseParents: Boolean;
    isChild: Boolean;
    isChildren2: Boolean;
    isChildren3: Boolean;
    isOthers: Boolean;
  };
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValuse>();

  const [errorMessage, setErrorMessage] = useState(String);

  const onSubmit = async (data) => {
    if (data.alone) {
      if (
        data.isMarried === true ||
        data.isParents === true ||
        data.isSpouseParents === true ||
        data.isChild === true ||
        data.isChildren2 === true ||
        data.isChildren3 === true ||
        data.isOthers === true
      ) {
        setErrorMessage(
          '一人暮らしが選択されています、他の選択肢を外してください'
        );

        return;
      }
    }
    if (
      (data.isChild && data.isChildren2) ||
      (data.isChild && data.isChildren3) ||
      (data.isChildren2 && data.isChildren3) ||
      (data.child && data.isChild2 && data.isChildren3)
    ) {
      setErrorMessage('子供の選択肢が複数選ばれています');

      return;
    }

    setErrorMessage('');
    await backfaceFixed(false);
    await setFamily(data);
    await setFamilyModal(false);
  };

  if (familyModal) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <div className={Styles.content_inner}>
              <button className={Styles.batsu} onClick={handleSubmit(onSubmit)}>
                ×
              </button>
              <label>家族構成</label>
              <div className={Styles.error_message}>{errorMessage}</div>
              <div className={Styles.flex_family}>
                <label>
                  <input {...register('alone')} type='checkbox' />
                  一人暮らし
                </label>
                <label>
                  <input {...register('isMarried')} type='checkbox' />
                  配偶者
                </label>
                <label>
                  <input {...register('isParents')} type='checkbox' />
                  ご自身の親
                </label>
                <label>
                  <input {...register('isSpouseParents')} type='checkbox' />
                  配偶者の親
                </label>
                <label>
                  <input {...register('isChild')} type='checkbox' />
                  子供
                </label>
                <label>
                  <input {...register('isChildren2')} type='checkbox' />
                  子供２人
                </label>
                <label>
                  <input {...register('isChildren3')} type='checkbox' />
                  子供３人以上
                </label>
                <label>
                  <input
                    {...register('isOthers')}
                    className='checks'
                    type='checkbox'
                  />
                  その他家族
                </label>
              </div>

              <div className={Styles.flex_container_item}></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
