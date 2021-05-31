import { DateTime } from "luxon";
const today = DateTime.now().toISO();
export const initStartTime = DateTime.now().plus({hour:1}).set({minute:0}).toISO();
export const initEndTime = DateTime.fromISO(initStartTime).plus({hour:1}).toISO();
export const initEndDate = DateTime.fromISO(initStartTime).plus({day:1}).toISO();
export type State = {
  user: {
    email: string;
    userName: string;
  };

  token: string;

  // 프로필 선택할때 필요한 상태
  profile: {
    isOn: boolean;
    leftPosition: number;
  };

  // 캘린더 렌더링 할때 필요한 상태
  base: {
    baseDate: string;
    basePeriod: string;
  };

  // 이벤트 만들기때 필요한 상태
  makeEventTodo:{
    isMakeBtnClick:boolean;
    isFromSidebar:boolean;
    selectDate: string;
    selectStartTime: string;
    selectEndTime:string;
    isSelectDateClick:boolean;
    isStartTimeClick:boolean;
    isEndTimeClick:boolean;
    selectEndDate:string;
  }

  // 일간 월간 선택할때 필요한 상태
  selector: {
    isOn: boolean;
    leftPosition: number;
  };
  //
  isSidebarOpen: boolean;

  colorOption: {
    isOptionClick: false;
    calendarId: number;
    yAxis: number;
  };
  eventTodo: {
    isEventClick: false;
    position: [0, 0];
    eventId: number;
    userId: number;
    calendarId: number;
    access: boolean;
  };

  data: {
    userName: string;
    userId: number;
    email: string;
    //calendars
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
};

export const initialState: State = {
  // User
  // User
  user: {
    email: "",
    userName: "",
  },

  token: "",

  // 프로필 선택시 필요한 상태
  profile: {
    isOn: false,
    leftPosition: 900,
  },

  // 캘린더 렌더링시 필요한 상태
  base: {
    baseDate: today,
    basePeriod: "week",
  },

  // 월간 주간 선택시 필요한 상태
  selector: {
    isOn: false,
    leftPosition: 900,
  },

  // 사이드바 접은 상태
  isSidebarOpen: true,

  // 캘린더 옵션 레이어 관련 상태
  colorOption: {
    isOptionClick: false,
    calendarId: 0,
    yAxis: 0,
  },

  // 만들기 레이어 관련 상태
  makeEventTodo:{
    isMakeBtnClick:false,
    isFromSidebar:true,
    selectDate: '',
    selectStartTime: initStartTime,
    selectEndTime:initEndTime,
    isSelectDateClick:false,
    isStartTimeClick:false,
    isEndTimeClick:false,
    selectEndDate:initEndDate
  },

  // 이벤트 할일 컴포넌트 클릭할 때 필요한 상태
  eventTodo: {
    isEventClick: false,
    position: [0, 0],
    eventId: 0,
    userId: 0,
    calendarId: 0,
    access: false,
  },

  data: {
    userName: "",
    userId: 0,
    email: "",
    //calendar
    calendar: [
      {
        calendarId: 0,
        calendarName: "",
        colour: "",
        //event
        event: [
          {
            eventId: 0,
            startTime: "",
            endTime: "",
            eventName: "",
            colour: "",
            location: "",
            description: "",
            access: true,
            notification: [],
          },
        ],
      },
    ],
    //toDoList
    toDoList: [
      {
        toDoListId: 0,
        toDoListName: "",
        colour: "",
      },
    ],
  },
};
