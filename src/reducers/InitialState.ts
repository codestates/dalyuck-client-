import { DateTime } from "luxon";
const today = DateTime.now().toISO();
export const initStartTime = DateTime.now()
  .plus({ hour: 1 })
  .set({ minute: 0 })
  .toISO()
  .split("T")[1];
export const initEndTime = DateTime.fromISO(initStartTime)
  .plus({ minute: 30 })
  .toISO()
  .split("T")[1];
export const initEndDate = DateTime.fromISO(initStartTime)
  .plus({ day: 1 })
  .toISO()
  .split("T")[0];
export const initEvent = {
  id: 0,
  startTime: "",
  endTime: "",
  eventName: "",
  colour: "",
  location: "",
  description: "",
  access: true,
  notification: [],
};
export const initTodo = {
  id: 0,
  startTime: "",
  endTime: "",
  toDoName: "",
  description: "",
  todolistId: 0,
};
export interface EventType {
  id: number;
  startTime: any;
  endTime: any;
  eventName: string;
  colour: string;
  location: string;
  description: string;
  access: boolean;
  notification: any[];
  calendarId: number;
}
export type State = {
  token: string;
  password: string;
  // 프로필 선택할때 필요한 상태
  profile: {
    isOn: boolean;
    leftPosition: number;
  };

  // 캘린더 렌더링 할때 필요한 상태
  base: {
    baseDate: string;
    basePeriod: "month" | "week" | "day";
  };

  // 이벤트 만들기때 필요한 상태
  makeEventTodo: {
    isMakeBtnClick: boolean;
    isFromSidebar: boolean;
    selectStartDate: string;
    selectStartTime: string;
    selectEndTime: string;
    isSelectDateClick: boolean;
    isStartTimeClick: boolean;
    isEndTimeClick: boolean;
    selectEndDate: string;
    isStartDateClick: boolean;
    isEndDateClick: boolean;
  };

  data: any; //search 데이터
  search: boolean; //search boolean

  // 일간 월간 선택할때 필요한 상태
  selector: {
    isOn: boolean;
    leftPosition: number;
  };
  //
  isSidebarOpen: boolean;

  colorOption: {
    isOptionClick: boolean;
    calendarId: number;
    yAxis: number;
    myOrOther: string;
  };
  eventTodo: {
    isEventClick: boolean;
    position: [0, 0];
    isEvent: "event" | "todo";
    event: {
      id: number;
      startTime: any;
      endTime: any;
      eventName: string;
      colour: string;
      location: string;
      description: string;
      access: boolean;
      notification: any[];
      calendarId: number;
      otherCalendarId: number;
      userId: number;
    };
    todo: {
      id: number;
      startTime: string;
      endTime: string;
      toDoName: string;
      description: string;
      todolistId: number;
    };
  };

  user: {
    userName: string;
    id: number;
    email: string;
    //calendars
    calendar: [
      {
        id: number;
        calendarName: string;
        colour: string;
        //event
        events: [
          {
            id: number;
            startTime: any;
            endTime: any;
            eventName: string;
            colour: string;
            location: string;
            description: string;
            access: boolean;
            notification: any[];
            calendarId: number;
          }
        ];
      }
    ];
    //toDoList
    todolist: [
      {
        id: number;
        colour: string;
        toDoListName: string;
        userId: number;
        todo: [
          {
            id: number;
            startTime: string;
            endTime: string;
            toDoName: string;
            description: string;
            todolistId: number;
          }
        ];
      }
    ];
    otherCalendars: [
      {
        id: number;
        calendarName: string;
        colour: string;
        userId: number;
        //event
        otherEvents: [
          {
            id: number;
            startTime: any;
            endTime: any;
            eventName: string;
            colour: string;
            location: string;
            description: string;
            access: boolean;
            notification: any[];
            otherCalendarId: number;
          }
        ];
      }
    ];
    attendEvents: [
      {
        id: number;
        startTime: string;
        endTime: string;
        eventName: string;
        colour: string;
        location: string;
        description: string;
        access: true;
        calendarId: number;
        notification: any[];
      }
    ];
  };

  calCheckArr:{
    myCal:number[];
    otherCal:number[];
    todo:boolean;
  };
  isSubLoading:boolean;
  isColorLoading:boolean;
};

export const initialState: State = {
  // User

  token: "",
  password: "",
  // 프로필 선택시 필요한 상태
  profile: {
    isOn: false,
    leftPosition: 900,
  },

  data: {},
  search: false,

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
    myOrOther: "",
  },

  // 만들기 레이어 관련 상태
  makeEventTodo: {
    isMakeBtnClick: false,
    isFromSidebar: true,
    selectStartDate: "",
    selectStartTime: initStartTime,
    selectEndTime: initEndTime,
    isSelectDateClick: false,
    isStartTimeClick: false,
    isEndTimeClick: false,
    selectEndDate: initEndDate,
    isStartDateClick: false,
    isEndDateClick: false,
  },

  // 이벤트 할일 컴포넌트 클릭할 때 필요한 상태
  eventTodo: {
    isEventClick: false,
    position: [0, 0],

    isEvent: "event",
    event: {
      id: 0,
      startTime: "",
      endTime: "",
      eventName: "",
      colour: "",
      location: "",
      description: "",
      access: true,
      notification: [],
      calendarId: 0,
      otherCalendarId: 0,
      userId: 0,
    },
    todo: {
      id: 0,
      startTime: "",
      endTime: "",
      toDoName: "",
      description: "",
      todolistId: 0,
    },
  },

  user: {
    id: 0,
    userName: "",
    email: "",
    //calendar
    calendar: [
      {
        id: 0,
        calendarName: "",
        colour: "",
        //event
        events: [
          {
            id: 0,
            startTime: "",
            endTime: "",
            eventName: "",
            colour: "",
            location: "",
            description: "",
            access: true,
            notification: [],
            calendarId: 0,
          },
        ],
      },
    ],
    //toDoList
    todolist: [
      {
        id: 0,
        colour: "",
        toDoListName: "",
        userId: 0,
        todo: [
          {
            id: 0,
            startTime: "",
            endTime: "",
            toDoName: "",
            description: "",
            todolistId: 0,
          },
        ],
      },
    ],
    otherCalendars: [
      {
        id: 0,
        calendarName: "",
        colour: "",
        //event
        userId: 0,
        otherEvents: [
          {
            id: 0,
            startTime: "",
            endTime: "",
            eventName: "",
            colour: "",
            location: "",
            description: "",
            access: true,
            notification: [],
            otherCalendarId: 0,
          },
        ],
      },
    ],
    attendEvents: [
      {
        id: 0,
        startTime: "",
        endTime: "",
        eventName: "",
        colour: "",
        location: "",
        description: "",
        access: true,
        calendarId: 0,
        notification: [],
      },
    ],
  },

  calCheckArr:{
    myCal:[],
    otherCal:[],
    todo:true,
  },
  isSubLoading:false,
  isColorLoading:false

};
