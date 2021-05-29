// Action Types
// User Actions

export const SIGN_IN = "SIGN_IN" as const;
export const SIGN_OUT = "SIGN_OUT" as const;
export const SELECT_PROFILE = "SELECT_PROFILE" as const;
// Date Action
export const SET_BASEDATE = "SET_BASEDATE" as const;
export const SET_BASEPERIOD = "SET_BASEPERIOD" as const;
export const SELECT_PERIOD = "SELECT_PERIOD" as const;
export const IS_SIDEBAR_OPEN = "IS_SIDEBAR_OPEN" as const;
export const IS_OPTION_CLICK = "IS_OPTION_CLICK" as const;
export const SET_EVENT_TODO = "SET_EVENT_TODO" as const;
export const SET_CALENDAR = "SET_CALENDAR" as const;
export const SET_MAKE_EVENT_TODO = "SET_MAKE_EVENT_TODO" as const;
export type Action =
  | ReturnType<typeof signIn>
  | ReturnType<typeof signOut>
  | ReturnType<typeof selectProfile>
  | ReturnType<typeof setBaseDate>
  | ReturnType<typeof setBasePeriod>
  | ReturnType<typeof selectPeriod>
  | ReturnType<typeof setIsSidebarOpen>
  | ReturnType<typeof isOptionClick>
  | ReturnType<typeof setEventTodo>
  | ReturnType<typeof setMakeEventTodo>
  | ReturnType<typeof setCalendar>;
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

export const selectProfile = (isOn = false, leftPosition = 900) => {
  return {
    type: SELECT_PROFILE,
    payload: {
      isOn,
      leftPosition,
    },
  };
};

export const setBaseDate = (baseDate: string) => {
  return {
    type: SET_BASEDATE,
    payload: {
      baseDate,
    },
  };
};
export const setBasePeriod = (basePeriod: string) => {
  return {
    type: SET_BASEPERIOD,
    payload: {
      basePeriod,
    },
  };
};

export const selectPeriod = (isOn = false, leftPosition = 900) => {
  return {
    type: SELECT_PERIOD,
    payload: {
      isOn,
      leftPosition,
    },
  };
};

export const setIsSidebarOpen = (isSidebarOpen: boolean) => {
  return {
    type: IS_SIDEBAR_OPEN,
    payload: {
      isSidebarOpen,
    },
  };
};

export const isOptionClick = (
  isOptionClick: boolean,
  calendarId: number,
  yAxis: number
) => {
  return {
    type: IS_OPTION_CLICK,
    payload: {
      colorOption: {
        isOptionClick,
        calendarId,
        yAxis,
      },
    },
  };
};

export const setEventTodo = (
  isEventClick: boolean,
  position: number[],
  eventId: number,
  calendarId: number,
  userId: number,
  access: boolean
) => {
  return {
    type: SET_EVENT_TODO,
    payload: {
      eventTodo: {
        isEventClick,
        position,
        eventId,
        userId,
        calendarId,
        access
      }
    }
  }
}

export const setMakeEventTodo = (
  isMakeBtnClick:boolean,
  selectDate: string,
  isFromSidebar:boolean,
  selectStartTime: number,
  selectEndtime:number,
) => {
  return {
    type: SET_MAKE_EVENT_TODO,
    payload: {
        isMakeBtnClick,
        isFromSidebar,
        selectDate,
        selectStartTime,
        selectEndtime,
    },
  };
};
export const setCalendar = (data:{calendarName:string;colour:string;description:string,id:number;userId:number}) => {
  return{
    type: IS_OPTION_CLICK,
    payload: {
      data
    }
  }
}


