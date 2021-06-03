import { makeDayInfoArr } from '../../functions/Calendar'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/index';
import { DateTime, Interval } from 'luxon';
import UnderDay from './UnderDay';
import { setBaseDate, setBasePeriod } from '../../actions/index';
import { useEffect, useState } from 'react';
import Allday from '../AllDay';

const weekdayArr = ["일", "월", "화", "수", "목", "금", "토"];

const MonthColumnheader = ({ day }: { day: string }) => {

  return (
    <div className="month-columnheader">
      <span className="month-columnheader__span">{day}</span>
    </div>
  );
};

const MonthWeekheaderDay = ({ day }: { day: DateTime }) => {

  const dispatch = useDispatch();

  let isToday = day.toFormat("D")===DateTime.now().toFormat("D")
  let dayNum:number|string = day.day
  if( day.day === 1 ) dayNum = day.toFormat("M월 d일");

  const baseHandler = () => {
    dispatch(setBaseDate(day.toISO()))
    dispatch(setBasePeriod('day'))
  }

  return (
    <div className="month-week__header-day">
      <div className="month-week__header-day-inner" >
        <h2 className={"month-week__header-day-inner-h2"+ (isToday ? ' today':'')} onClick={()=>{baseHandler()}}>{dayNum}</h2>
      </div>
    </div>
  );
};

const WeekEvent = ({day, calendar}:any) => {

  let events:any[]=[] ;
  const { user } = useSelector((state:RootState)=>state.userReducer);
  const [userHook, serUserHook] = useState(user)
  useEffect(()=>{
    serUserHook(user)
  },[user])
  if(userHook){
    userHook.calendar.forEach((cal:any)=>{      // 모든 캘린더의 이벤트들을 하나의 배열안에 넣음
      if(cal.events){
        cal.events.forEach((event:any)=>{          // 하나의 이벤트에 캔린더id 유저id 넣어 가공했음 (속성으로 전달할때 간편하게 전달하기 위해서)
          event.userId = cal.userId;
        })
        events = [...events,...cal.events]
      }
    })
  }

  if(userHook){
    userHook.otherCalendars.forEach((cal:any)=>{      // 모든 구독한 캘린더의 이벤트들을 하나의 배열안에 넣음
      if(cal.otherEvents){
        cal.otherEvents.forEach((event:any)=>{          // 하나의 이벤트에 캔린더id 유저id 넣어 가공했음 (속성으로 전달할때 간편하게 전달하기 위해서)
          event.calendarId =cal.otherCalendarId
          event.userId = cal.userId;
        })
        events = [...events,...cal.otherEvents]
      }
    })
  }

  if(userHook.attendEvents.length > 0 ) events = events.concat(userHook.attendEvents);   // 참가자
  if(userHook.todolist.length > 0){
    if(userHook.todolist[0].todo.length > 0 ) events = events.concat(userHook.todolist[0].todo); // 할일 
  }

  let underEvents = events.filter(event=>{
    let startTime = DateTime.fromISO(event.startTime);
    let endTime = DateTime.fromISO(event.endTime);
    let hours = (Interval.fromDateTimes(startTime,endTime).count('hour') < 24)
    let todays = DateTime.fromISO(event.startTime).toFormat("D") === day.toFormat("D");
    return hours && todays
  })

  let alldayEvents = events.filter(event=>{
    let startTime = DateTime.fromISO(event.startTime);
    let endTime = DateTime.fromISO(event.endTime);
    let hours = (Interval.fromDateTimes(startTime,endTime).count('hour') >= 24)
    let todays = DateTime.fromISO(event.startTime).toFormat("D") === day.toFormat("D");
    return hours && todays
  })

  return (
    <div className="week-event">{/* 이벤트 할일 들어갈 곳 */}
      {
        alldayEvents.map((dayEvent:any)=>{
          return <Allday key={dayEvent} event={dayEvent}/>
        })
      }
      {
        underEvents.map((dayEvent:any)=>{
          return <UnderDay key={dayEvent} event={dayEvent}/>
        })
      }
    </div>)
};

const MonthWeek = (props:{headerDay:DateTime[]}) => {
  const { user } = useSelector((state:RootState)=>state.userReducer);

  let calendar = user.calendar;          
  let headerDay=props.headerDay
  return (
    <div className="month-weeks__week">
      {/* 주단위 컴포넌트 매핑 */}
      <div className="month-weeks__header">
        {/* 2 3 4 5 6 날짜 헤더컴포 매핑 */}
        {headerDay.map((day) => {
          return <MonthWeekheaderDay key={day.day} day={day} />;
        })}
      </div>
      <div className="month-week__body">
        <div className="month-week__body-inner">
          {headerDay.map((day, i) => {
            return <WeekEvent key={i} day={day} calendar={calendar}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default function MaincalendarMonth() {


  const {base} = useSelector( (state:RootState) => state.userReducer )
  const weekInfoArr = makeDayInfoArr(base)

  return (
    <div className="calendar-month">
      <div className="calendar-month__inner">
        <div className="calendar-month__header">
          {/* 일월화수목금토 헤더*/}
          {weekdayArr.map((day) => {
            return <MonthColumnheader key={day} day={day} />;
          })}
        </div>
        <div className="month-weeks">
          {
            weekInfoArr.map((week:any)=>{
              return(
                <MonthWeek key={week[0].toString()} headerDay={week}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}