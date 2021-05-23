import { SIGN_IN, SIGN_OUT, USER_INFO } from "../actions/index";
import { initialState, State } from "./InitialState";
import { Action } from "../actions";

const userReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        data: action.payload.data,
        token: action.payload.token,
      });
    //아직
    case SIGN_OUT:
      return Object.assign({}, state, {
        token: "",
      });

    case USER_INFO:
      return Object.assign({}, state, {
        user: {
          userName: action.payload.userName,
          email: action.payload.email,
        },
      });

    default:
      return state;
  }
};

export default userReducer;
