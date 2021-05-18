import {
  SIGN_IN,
  SIGN_OUT,
  USER_INFO,
  GET_GOOGLE_TOKEN,
} from "../actions/index";
import { initialState, State } from "./InitialState";
import { Action } from "../actions";

const userReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        ...state,
      });

    case SIGN_OUT:
      return Object.assign({}, state, {
        user: {
          token: "",
          userName: "",
          email: "",
        },
      });

    case USER_INFO:
      return Object.assign({}, state, {
        user: {
          userName: action.payload.userName,
          email: action.payload.email,
        },
      });

    case GET_GOOGLE_TOKEN:
      return Object.assign({}, state, {
        googleToken: action.payload.data,
      });

    default:
      return state;
  }
};

export default userReducer;
