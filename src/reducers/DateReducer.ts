import {
  SELECT_PERIOD,
  SET_BASEDATE,
  SET_BASEPERIOD,
  IS_SIDEBAR_OPEN,
  IS_OPTION_CLICK,
  } from "../actions/index";
 import { initialState, State } from "./InitialState";
 import { Action } from "../actions";
  
  const dateReducer = (state:State = initialState, action:Action):State => {
    switch (action.type) {
      case SET_BASEDATE:
        return Object.assign({}, state, {
          ...state,
          base:{
            ...state.base,
            ...action.payload
          }

        });
      case SET_BASEPERIOD:
        return Object.assign({}, state, {
          ...state,
          base:{
            ...state.base,
            ...action.payload
          }

        });
      case SELECT_PERIOD:
        return Object.assign({}, state, {
          ...state,
          selector:{
            ...state.selector,
            ...action.payload
          }
        });
      case IS_SIDEBAR_OPEN:
        return Object.assign({}, state, {
          ...state,
          ...action.payload
        });
      case IS_OPTION_CLICK:
        return Object.assign({}, state, {
          ...state,
          ...action.payload
        });        
      default:
        return state;
    }
  };
  
  export default dateReducer;