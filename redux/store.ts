import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit';
import userReducer from './usersSlice';
import counterReducer from './counterSlice';
import postReducer from './postsSlice';
import modalPostReducer from './modalSlice';
import isUseEffectReducer from './isUseEffect';
import todoSearchBarReducer from './todos/todoSearchBarSlice';
import openDataReducer from './todos/openDataSlice';
import loginUserCheckReducer from './loginUserCheckSlice';
import { persistReducer } from 'redux-persist';
import mailReducer from './mailSlice';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import loadingReducer from './loadingSlice';
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
  loading: loadingReducer,
  loginUserCheck: loginUserCheckReducer,
  openData: openDataReducer,
  isUseEffect: isUseEffectReducer,
  modalPost: modalPostReducer,
  counter: counterReducer,
  users: userReducer,
  posts: postReducer,
  todoSearchBar: todoSearchBarReducer,
  mails: mailReducer,
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
