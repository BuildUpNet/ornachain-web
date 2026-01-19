// import { Login_Data } from '../Actions/ActionsTypes'

// const initialstate = {
//   Data: [], //abhi initialy koi data ni h
// }

// const ReducerData = (state = initialstate, action) => {
//   switch (action.type) {
//     case Login_Data: //jb ye case match ho tb return krna h
//       return {
//         ...state,
//         Data: [...state.Data, action.payload.text], // purana data bhi rahega
//       }
//     default:
//       return state
//   }
// }
// export default ReducerData

import { LOGIN_DATA } from '../Actions/ActionsTypes';

const initialState = {
  user: null,
};

// export default function loginReducer(state = initialState, action) {
//   switch (action.type) {
//     case LOGIN_DATA:
//       return {
//         ...state,
//         user: action.payload.text,
//       }
//     default:
//       return state
//   }
// }

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_DATA':
      return { ...state, user: action.payload.text };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
}
