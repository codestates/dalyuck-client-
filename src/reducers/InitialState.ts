export type State = {
  user: {
    email: string;
    userName: string;
  };

  token: string;

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
};

export const initialState: State = {
  // User
  // User
  user: {
    email: "",
    userName: "",
  },

  token: "",

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
