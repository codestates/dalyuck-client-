import { DateTime } from 'luxon';
const today = DateTime.now().toISO()

export type State = {
  user: {
    email: string;
    userName: string;
  };

  token: string;



  // 캘린더 렌더링 할때 필요한 상태
  base :{
    baseDate: string,
    basePeriod: string
  },
  // 일간 월간 선택할때 필요한 상태
  selector:{
    isOn: boolean,
    leftPosition: number
  }
  //
  isSidebarOpen:boolean;

  data: {
    userName: string;
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

  // 캘린더 렌더링시 필요한 상태
  base :{
    baseDate: today,
    basePeriod: 'week',
  },

  // 월간 주간 선택시 필요한 상태
  selector:{
    isOn: false,
    leftPosition:900
  },

  // 사이드바 접은 상태
  isSidebarOpen:true,
  
  data: {
    userName: "",
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

