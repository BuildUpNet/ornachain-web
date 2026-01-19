// store.js
import { legacy_createStore as createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from '../Reducers/LoginReducer';

// Initial UI state
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

// Combine both reducers
const rootReducer = combineReducers({
  app: changeState,
  login: loginReducer,
});
// Persist config
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export default store;
