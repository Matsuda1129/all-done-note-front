import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit';
import userReducer from './usersSlice';
import counterReducer from './counterSlice';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootReducer = combineReducers({
  counter: counterReducer,
  users: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'p-next-test',
  version: 1,
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const useStore = (): EnhancedStore => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};
