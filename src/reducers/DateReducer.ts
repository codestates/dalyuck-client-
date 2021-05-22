import {
    SET_BASEDATE,
  } from "../actions/index";
  import { initialDate } from "./InitialState";
  
  const dateReducer = (state = initialDate, action:{type:string;payload:{baseDate:string}}) => {
    switch (action.type) {
      case SET_BASEDATE:
        return Object.assign({}, state, {
          ...state,
          base:{
            ...state.base,
            ...action.payload
          }

        });
      default:
        return state;
    }
  };
  
  export default dateReducer;