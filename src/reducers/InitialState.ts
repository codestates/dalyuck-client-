import { DateTime } from 'luxon';

export type State = {
  user: {};

  token: string;
  email: string;
  userName: string;

  googleToken: string;

  data: {};

  //calendar
  calendar: [
    {
      calendarId: number;
      calendarName: string;
      colour: string;
    }
  ];
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
      notification: [];
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

export const initialState: State = {
  // User
  user: {},
  token: "",
  email: "",
  userName: "",

  googleToken: "",

  data: {},

  //calendar
  calendar: [
    {
      calendarId: 0,
      calendarName: "",
      colour: "",
    },
  ],
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
  //toDoList
  toDoList: [
    {
      toDoListId: 0,
      toDoListName: "",
      colour: "",
    },
  ],
};

const today = DateTime.now().toISO()
export const initialDate = {
  "base" :{
    "baseDate": today,
    "basePeriod": 'week',
  }
}