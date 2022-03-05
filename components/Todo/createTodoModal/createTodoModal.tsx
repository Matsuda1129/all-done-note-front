import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useForm } from 'react-hook-form';
import Styles from './createTodoModal.module.css';
import { Button } from '../../utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createOneList } from '../../../repositories/todos';
import { setTrue } from '../../../redux/isUseEffect';

type FormValuse = {
  group: string;
  genre: string;
  listname: string;
  memo: string;
  money: number;
};

export default function CreateTodoModal({
  createTodoModal,
  openCreateTodoModal,
}) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.users.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuse>();

  const onSubmit = async (data) => {
    try {
      await createOneList(data, user.id);
      await reset();
      await dispatch(setTrue());
      alert('todoリストを作成しました');
      await openCreateTodoModal();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div>
      {createTodoModal ? (
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <div className={Styles.content_inner}>
              <button className={Styles.batsu} onClick={openCreateTodoModal}>
                ×
              </button>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={Styles.flex_container}>
                  <div className={Styles.flex_container_row}>
                    <label>グループ</label>
                    <Select {...register('group')} defaultValue={'お金'}>
                      <MenuItem value='お金'>生活費用</MenuItem>
                      <MenuItem value='準備'>準備</MenuItem>
                      <MenuItem value='やりたいこと'>やりたいこと</MenuItem>
                    </Select>
                  </div>
                  <div className={Styles.flex_container_row}>
                    {errors.genre && (
                      <div className={Styles.redColor}>
                        {errors.genre.message}
                      </div>
                    )}
                    <label>ジャンル</label>
                    <input
                      {...register('genre', {
                        required: 'ジャンルは必須項目です',
                        maxLength: {
                          value: 20,
                          message: 'ジャンルは20字以内でお願いします',
                        },
                      })}
                    />
                  </div>

                  {errors.listname && (
                    <div className={Styles.redColor}>
                      {errors.listname.message}
                    </div>
                  )}
                  <label>リスト名</label>
                  <input
                    {...register('listname', {
                      required: 'リスト名は必須項目です',
                      maxLength: {
                        value: 20,
                        message: 'リスト名は20字以内でお願いします',
                      },
                    })}
                    type='text'
                    placeholder='リスト名'
                    className={Styles.flex_container_item}
                  />

                  {errors.money && (
                    <div className={Styles.redColor}>
                      {errors.money.message}
                    </div>
                  )}
                  <label>費用</label>
                  <input
                    {...register('money', {
                      required: '費用は必須項目です',
                    })}
                    type='number'
                    placeholder='10000'
                    className={Styles.flex_container_item}
                  />
                  {errors.memo && (
                    <div className={Styles.redColor}>{errors.memo.message}</div>
                  )}
                  <label>メモ</label>
                  <textarea
                    rows={5}
                    {...register('memo', {
                      maxLength: {
                        value: 1000,
                        message: '自己紹介は1000字以内でお願いします',
                      },
                    })}
                    placeholder='メモ'
                    className={Styles.flex_container_item}
                  />
                  <div className={Styles.flex_container_item}>
                    <Button type='submit'>作成する</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
