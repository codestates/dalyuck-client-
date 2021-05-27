export const events = [
    {
        startTime : "2021-05-20T13:00:00.000+09:00",
        endTime: "2021-05-20T13:30:00.000+09:00",
        eventName: "회의1",
        colour: "rgb(97, 97, 97)",
        description: "아침 정기 회의",

    },
    {
        startTime : "2021-05-20T10:00:00.000+09:00",
        endTime: "2021-05-20T11:30:00.000+09:00",
        eventName: "회의2",
        colour: "rgb(192, 202, 51)",
        description: "아침 정기 회의",

    },
    {
        startTime : "2021-05-21T09:30:00.000+09:00",
        endTime: "2021-05-21T11:30:00.000+09:00",
        eventName: "회의3",
        colour: "rgb(66, 133, 244)",
        description: "아침 정기 회의",

    },
]
interface Event {
    startTime : string;
    endTime: string;
    eventName: string;
    colour: string;
    location: string;
    description: string;
    access: boolean;
    notification: string[];
};
export type Calendar = {
    calenderName:string;
    colour: string;
    event: Event[];
}[];
export const calendar = [
    {
      calendarId:1,  
      calenderName: "강정환",
      colour: "#7986CB",
      event: [
        {
            startTime : "2021-05-24T13:00:00.000+09:00",
            endTime: "2021-05-24T13:30:00.000+09:00",
            eventName: "아침회의",
            colour: "rgb(97, 97, 97)",
            location: "서울시 인수동",
            description: "아침 정기 회의",
            access: true,
            notification: [
                "20201025_0940"
            ]
        },
        {
            startTime : "2021-05-24T13:00:00.000+09:00",
            endTime: "2021-05-24T13:30:00.000+09:00",
            eventName: "아침회의",
            colour: "rgb(97, 97, 97)",
            location: "서울시 인수동",
            description: "아침 정기 회의",
            access: true,
            notification: [
                "20201025_0940"
            ]
        },
        {
            startTime : "2021-05-25T13:00:00.000+09:00",
            endTime: "2021-05-25T13:30:00.000+09:00",
            eventName: "아침회의",
            colour: "rgb(97, 97, 97)",
            location: "서울시 인수동",
            description: "아침 정기 회의",
            access: true,
            notification: [
                "20201025_0940"
            ]
        }
      ]
    },
    {
        calendarId:2,  
        calenderName: "회의",
        colour: "rgb(192, 202, 51)",
        event: [
          {
            startTime : "2021-05-24T13:00:00.000+09:00",
            endTime: "2021-05-24T13:30:00.000+09:00",
              eventName: "아침회의",
              colour: "rgb(192, 202, 51)",
              location: "서울시 인수동",
              description: "아침 정기 회의",
              access: true,
              notification: [
                  "20201025_0940"
              ]
          },
          {
            startTime : "2021-05-27T13:00:00.000+09:00",
            endTime: "2021-05-27T13:30:00.000+09:00",
              eventName: "아침회의",
              colour: "rgb(192, 202, 51)",
              location: "서울시 인수동",
              description: "아침 정기 회의",
              access: true,
              notification: [
                  "20201025_0940"
              ]
          },
          {
            startTime : "2021-05-28T13:00:00.000+09:00",
            endTime: "2021-05-28T13:30:00.000+09:00",
              eventName: "아침회의",
              colour: "rgb(192, 202, 51)",
              location: "서울시 인수동",
              description: "아침 정기 회의",

          }
        ]
      }
    ]
