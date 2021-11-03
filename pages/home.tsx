import homeStyles from '../styles/home.module.css';
import Menubar from '../components/menubar';
import Flash from '../components/flash';
import { ProtectRoute } from '../components/protectRouter';
import { useDispatch } from 'react-redux';
import { setUsers } from '../redux/usersSlice';
import React, { useEffect } from 'react';

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${process.env.baseURL}/user/cookie`, {
          credentials: 'include',
        });

        const content = await response.json();
        if (content.statusCode) {
          throw new Error('error');
        }

        dispatch(setUsers(content));
      } catch (e) {}
    })();
  }, [dispatch]);

  return (
    <ProtectRoute>
      <div className={homeStyles.bodyBackground}>
        <div className={homeStyles.grid_container}>
          <div className={homeStyles.item_A}>
            <div className={homeStyles.menubar_position}>
              <Menubar />
            </div>
          </div>
          <div className={homeStyles.item_B}>B</div>
          <div className={homeStyles.item_C}>
            <Flash />
          </div>
        </div>
      </div>
    </ProtectRoute>
  );
}
