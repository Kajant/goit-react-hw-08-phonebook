import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './authReducers';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { contactsReducer } from './contactsSlice';


const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};
export const rootReducer = combineReducers({
  contacts: contactsReducer,
  auth: persistReducer(authConfig, authReducer),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);