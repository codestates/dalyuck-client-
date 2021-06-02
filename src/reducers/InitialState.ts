import { DateTime } from "luxon";
const today = DateTime.now().toISO();
export const initStartTime = DateTime.now().plus({hour:1}).set({minute:0}).toISO().split('T')[1];
export const initEndTime = DateTime.fromISO(initStartTime).plus({hour:1}).toISO().split('T')[1];
export const initEndDate = DateTime.fromISO(initStartTime).plus({day:1}).toISO().split('T')[0];
export const initEvent = {
      id: 0,
      startTime: '',
      endTime: '',
      eventName: '',
      colour: '',
      location: '',
      description: '',
      access: true,
      notification: []
}
export type State = {

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
    selectStartDate: string;
    selectStartTime: string;
    selectEndTime:string;
    isSelectDateClick:boolean;
    isStartTimeClick:boolean;
    isEndTimeClick:boolean;
    selectEndDate:string;
    isStartDateClick:boolean;
    isEndDateClick:boolean;
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
    event:{
      id: number;
      startTime: any;
      endTime: any;
      eventName: string;
      colour: string;
      location: string;
      description: string;
      access: boolean;
      notification: any[]; 
    }
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
        event: [
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
          }
        ];
      }
    ];
    //toDoList
    todolist: [
      {
        id:number,
        colour: string;
        toDoListName: string;
        userId:number;
        todo: [
          {
            id: number;
            startTime: any;
            toDoName: string;
            description: string;
            todolistId:number;
          }]
      }
    ];
    otherCalendar: [
      {
        id: number;
        calendarName: string;
        colour: string;
        //event
        event: [
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
          }
        ];
      }
    ]
  };
};

export const initialState: State = {
  // User

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
    selectStartDate: '',
    selectStartTime: initStartTime,
    selectEndTime:initEndTime,
    isSelectDateClick:false,
    isStartTimeClick:false,
    isEndTimeClick:false,
    selectEndDate:initEndDate,
    isStartDateClick:false,
    isEndDateClick:false
  },

  // 이벤트 할일 컴포넌트 클릭할 때 필요한 상태
  eventTodo: {
    isEventClick: false,
    position: [0, 0],
    event:{
      id: 0,
      startTime: '',
      endTime: '',
      eventName: '',
      colour: '',
      location: '',
      description: '',
      access: true,
      notification: []
    }
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
        event: [
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
          },
        ],
      },
    ],
    //toDoList
    todolist: [
      {
        id:0,
        colour: '',
        toDoListName: '',
        userId:0,
        todo: [
          {
            id: 0,
            startTime: '',
            toDoName: '',
            description: '',
            todolistId:0,
          }]
      }
    ],
    otherCalendar: [
      {
        id: 0,
        calendarName: "",
        colour: "",
        //event
        event: [
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
          },
        ],
      },
    ],
  },
};
