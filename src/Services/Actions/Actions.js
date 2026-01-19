import { LOGIN_DATA } from './ActionsTypes';

// login ke liye
export const addLoginDetails = (text) => ({
  type: LOGIN_DATA,
  payload: { text },
});
