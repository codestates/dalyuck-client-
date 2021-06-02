import {
  SELECT_PERIOD,
  SET_BASEDATE,
  SET_BASEPERIOD,
  IS_SIDEBAR_OPEN,
  IS_OPTION_CLICK,
  SET_EVENT_TODO,
  SET_MAKE_EVENT_TODO,
  SET_IS_SELECT_DATE_CLICK,
  SET_START_TIME,
  SET_END_TIME,
  SET_IS_START_TIME_CLICK,
  SET_IS_END_TIME_CLICK,
  SET_END_DATE,
  SET_SELECT_START_DATE,
  SET_IS_END_DATE_CLICK,
  SET_CALENDAR,
  SIGN_IN, 
  SIGN_OUT, 
  SELECT_PROFILE,
  SET_IS_START_DATE_CLICK,
  SET_TODOLIST,
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
      case SET_EVENT_TODO:
        return Object.assign({}, state, {
          ...state,
          ...action.payload
        });
      case SET_MAKE_EVENT_TODO:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_IS_SELECT_DATE_CLICK:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_START_TIME:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_END_TIME:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_IS_START_TIME_CLICK:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_IS_END_TIME_CLICK:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_END_DATE:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_SELECT_START_DATE:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_IS_END_DATE_CLICK:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      case SET_CALENDAR:
        return Object.assign({}, state, {
          ...state,
          user:{
            ...state.user,
            ...action.payload
          }
        });
      case SET_TODOLIST:
        return Object.assign({}, state, {
          ...state,
          user:{
            ...state.user,
            ...action.payload
          }
        })
      case SIGN_IN:
        return Object.assign({}, state, {
          user: action.payload.data,
          token: action.payload.token,
        });
      case SIGN_OUT:
        return Object.assign({}, state, {
          ...initialState
        });
      case SELECT_PROFILE:
        return Object.assign({}, state, {
          ...state,
          profile: {
            ...state.profile,
            ...action.payload,
          },
        });
      case SET_IS_START_DATE_CLICK:
        return Object.assign({}, state, {
          ...state,
          makeEventTodo:{
            ...state.makeEventTodo,
            ...action.payload
          }
        })
      default:
        return state;
    }
  };
  
  export default dateReducer;