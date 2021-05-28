import { SIGN_IN, SIGN_OUT, SELECT_PROFILE } from "../actions/index";
import { initialState, State } from "./InitialState";
import { Action } from "../actions";

const userReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SIGN_IN:
      return Object.assign({}, state, {
        data: action.payload.data,
        token: action.payload.token,
      });
    case SIGN_OUT:
      return Object.assign({}, state, {
        data: "",
        token: "",
      });
    case SELECT_PROFILE:
      return Object.assign({}, state, {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      });
    default:
      return state;
  }
};

export default userReducer;
