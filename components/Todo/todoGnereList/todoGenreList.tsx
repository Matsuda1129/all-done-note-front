import React, { useEffect, useState } from 'react';
import { findLists } from '../../../repositories/todos';
import TodoLists from '../parts/todoLists.tsx/todoLists';

export default function TodoGenreList(props) {
  const [lists, setList] = useState([]);
  useEffect(() => {
    const firstFetch = async () => {
      try {
        const listData: any = await findLists(
          props.userId,
          props.group,
          props.genre
        );
        await setList(listData);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetch();
  }, [props.genre, props.group, props.isUseEffect, props.userId]);

  useEffect(() => {
    if (props.isUseEffect === false) {
      const firstFetch = async () => {
        try {
          const listData: any = await findLists(
            props.userId,
            props.group,
            props.genre
          );
          console.log(listData);
          await setList(listData);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [props.genre, props.group, props.isUseEffect, props.userId]);

  return (
    <div>
      {lists.map((list) => {
        return (
          <TodoLists
            key={list}
            list={list}
            setIsUseEffect={props.setIsUseEffect}
          />
        );
      })}
    </div>
  );
}
