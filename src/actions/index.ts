// Action Types
// User Action
export const SIGN_IN = "SIGN_IN" as const;
export const SIGN_OUT = "SIGN_OUT" as const;
export const USER_INFO = "USER_INFO" as const;
export const GET_GOOGLE_TOKEN = "GET_GOOGLE_TOKEN" as const;

// Date Action
export const SET_BASEDATE = "SET_BASEDATE" as const;
export const SET_BASEPERIOD = "SET_BASEPERIOD" as const;
export const SELECT_PERIOD = "SELECT_PERIOD" as const;


export type Action =
  | ReturnType<typeof signIn>
  | ReturnType<typeof signOut>
  | ReturnType<typeof userInfo>
  | ReturnType<typeof getGoogleToken>
  | ReturnType<typeof setBaseDate>
  | ReturnType<typeof setBasePeriod>
  | ReturnType<typeof selectPeriod>;

export interface User {
  token: string;
  email: string;
  userName: string;
  isLogin: boolean;
  data: any;
}

// Action Creators
// User Action Creator
export const signIn = (
  data: any,
  token?: string,
  email?: string,
  userName?: string
) => {
  return {
    type: SIGN_IN,
    payload: { ...data, token, email, userName },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const userInfo = (token: string, email: string, userName: string) => {
  return {
    type: USER_INFO,
    payload: {
      email,
      userName,
    },
  };
};

export const getGoogleToken = (data: string) => {
  return {
    type: GET_GOOGLE_TOKEN,
    payload: {
      data,
    },
  };
};

export const setBaseDate= (baseDate:string) => {
  return {
    type: SET_BASEDATE,
    payload: {
      baseDate
    },
  };
};
export const setBasePeriod= (basePeriod:string) => {
  return {
    type: SET_BASEPERIOD,
    payload: {
      basePeriod
    },
  };
};

export const selectPeriod= (isOn=false, leftPosition=900) => {
  return {
    type: SELECT_PERIOD,
    payload: {
      isOn,
      leftPosition
    },
  };
};