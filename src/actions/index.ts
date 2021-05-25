// Action Types
// User Actions

export const SIGN_IN = "SIGN_IN" as const;
export const SIGN_OUT = "SIGN_OUT" as const;
export const USER_INFO = "USER_INFO" as const;

// Date Action
export const SET_BASEDATE = "SET_BASEDATE" as const;
export const SET_BASEPERIOD = "SET_BASEPERIOD" as const;
export const SELECT_PERIOD = "SELECT_PERIOD" as const;
export const IS_SIDEBAR_OPEN = "IS_SIDEBAR_OPEN" as const;

export type Action =
  | ReturnType<typeof signIn>
  | ReturnType<typeof signOut>
  | ReturnType<typeof setBaseDate>
  | ReturnType<typeof setBasePeriod>
  | ReturnType<typeof selectPeriod>
  | ReturnType<typeof userInfo>
  | ReturnType<typeof setIsSidebarOpen>;

export interface UserInfo {
  data: {
    userName: string;
    //calendar
    calendar: [
      {
        calendarId: number;
        calendarName: string;
        colour: string;
        //event
        event: [
          {
            eventId: number;
            startTime: any;
            endTime: any;
            eventName: string;
            colour: string;
            location: string;
            description: string;
            access: boolean;
            notification: any[];
          }
        ];
      }
    ];
    //toDoList
    toDoList: [
      {
        toDoListId: number;
        toDoListName: string;
        colour: string;
      }
    ];
  };
}

// Action Creators
// User Action Creator
export const signIn = (data: UserInfo, token: string) => {
  return {
    type: SIGN_IN,
    payload: { data, token },
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const userInfo = (email: string, userName: string) => {
  return {
    type: USER_INFO,
    payload: {
      email,
      userName,
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

export const setIsSidebarOpen = (isSidebarOpen:boolean) => {
  return{
    type: IS_SIDEBAR_OPEN,
    payload: {
      isSidebarOpen
    }
  }
}

