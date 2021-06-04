import { DateTime, Interval } from 'luxon';
import { useDispatch, useSelector } from 'react-redux'
import { setEventTodo } from "../../actions/index";
import { useEffect, useRef, useState } from 'react';   // 레퍼런스 훅스
import { RootState } from '../../reducers/index';

export const timeToPixel = (time:DateTime):number=>{
  const minute = time.minute;
  const hour = time.hour;
  const conmponentHeight = 1153;

  const heightPx = conmponentHeight*((hour+(minute/60))/24)
  return heightPx
}

const Redline = ({height}:any)=>{
  return (
    <div>
      <div className = "tody-time-line" style ={{top: height + 'px'}}/>
      <div className = "today-time-dot" style ={{top: height + 'px'}}/>
    </div>
  )

}


const Event = ({ event }:any ) => {

  const { user } = useSelector((state:RootState)=>state.userReducer);
  const start = DateTime.fromISO(event.startTime);
  const end = DateTime.fromISO(event.endTime);
  const startPixel = timeToPixel(start);
  const interval = Interval.fromDateTimes(start, end);
  const intervalPixel = 48 * interval.length("hour");

  let color = '';
  if(event.colour){
    color = event.colour;
  }else{
    color = user.todolist[0].colour;
  }

  const position = {
    top: startPixel,
    height: intervalPixel,
    backgroundColor: color
  };
  const componentRef = useRef<HTMLDivElement>(null);  //  ref타입 설정
  const dispatch = useDispatch();
  const eventHandler = () =>{
    if( componentRef.current?.getBoundingClientRect() ) {
      let x:number,y:number;
      x = componentRef.current?.getBoundingClientRect().x;
      y = componentRef.current?.getBoundingClientRect().y;
      if(event.todolistId){
        dispatch(setEventTodo(true, [x,y],'todo',undefined, event));
      }else{
        dispatch(setEventTodo(true, [x,y], 'event', event, undefined));
      }
    } 
  }

  let name:string ='';
  if(event.eventName){
    name = event.eventName;
  }else{
    name = event.toDoName;
  }

  return (
    <div className="event-con" style={position} ref={componentRef} onClick={()=>{eventHandler()}}>
      <div className="event-text-con">
        {/* 30분짜리면 span 1시간 이상이면 div 인데 */}
        <div className="event-text-title-con">
          <span className="event-text-title">{name}</span>
        </div>
        <div className="event-text-time">
          {start.toFormat("HH:mm")+"~"+end.toFormat("HH:mm")}
        </div>
      </div>
    </div>
  );
};

const Day = ({ day }: any) => {

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
  // events = [...events , ...user.attendEvents];         참가자 중복 되어서 주석

  events = events.filter(event=>{
    let startTime = DateTime.fromISO(event.startTime);
    let endTime = DateTime.fromISO(event.endTime);
    let result = (Interval.fromDateTimes(startTime,endTime).count('hour') < 24)
    return result
  })

  const now = DateTime.now(); //  현재시간
  const height = timeToPixel(now);
  const isToday = day.toFormat("D") === now.toFormat("D");
  const dayEvent = events.filter((event) => {                            //당일의 이벤트만 필터링
    return DateTime.fromISO(event.startTime).toFormat("D") === day.toFormat("D");
  });


  return (
    <div className="day-con">
      {isToday ? <Redline height={height} /> : null}
      <div className="day-con-1">
        {/* 할일, 이벤트 컴포넌트 들어갈곳 */}
        {dayEvent.map((event) => (
          <Event event={event} />
        ))}
      </div>
    </div>
  );
};

export default Day;