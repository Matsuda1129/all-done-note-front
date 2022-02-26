import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { useForm } from 'react-hook-form';
import Styles from './editTodoModal.module.css';
import { Button } from '../../../../../utils';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { editTodo } from '../../../../../../repositories/todos';
import { setTrue } from '../../../../../../redux/isUseEffect';

type FormValuse = {
  group: string;
  genre: string;
  listname: string;
  memo: string;
  money: number;
};

export default function EditTodoModal({
  list,
  openEditTodoModal,
  editTodoModal,
  userId,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      await editTodo(data, list.id, userId);
      await dispatch(setTrue());
      await alert('保存しました');
      await openEditTodoModal();
    } catch (e) {
      alert(e);
    }
  };

  if (editTodoModal) {
    return (
      <div>
        <div className={Styles.overlay}>
          <div className={Styles.content}>
            <button className={Styles.batsu} onClick={openEditTodoModal}>
              ×
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={Styles.flex_container}>
                <div className={Styles.flex_container_left}>
                  <div className={Styles.flex_container_item}>
                    <label>グループ</label>
                    <div>
                      <Select {...register('group')} defaultValue={list.group}>
                        <MenuItem value='お金'>お金</MenuItem>
                        <MenuItem value='準備'>準備</MenuItem>
                        <MenuItem value='やりたいこと'>やりたいこと</MenuItem>
                      </Select>
                    </div>
                  </div>
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
                    className={Styles.flex_container_item}
                    defaultValue={list.genre}
                  />

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
                    defaultValue={list.listname}
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
                    defaultValue={list.money}
                  />
                  {errors.memo && (
                    <div className={Styles.redColor}>{errors.memo.message}</div>
                  )}
                </div>

                <div className={Styles.flex_container_right}>
                  <label>メモ</label>
                  <textarea
                    rows={15}
                    {...register('memo', {
                      maxLength: {
                        value: 1000,
                        message: 'メモは1000字以内でお願いします',
                      },
                    })}
                    placeholder='メモ'
                    defaultValue={list.memo}
                  />
                </div>
              </div>
              <div className={Styles.button}>
                <Button type='submit'>保存する</Button>
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
