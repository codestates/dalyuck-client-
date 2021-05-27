import { DateTime, Interval } from 'luxon';
import { data ,EventType } from '../../fakeData/Events';
import { useDispatch } from 'react-redux'
import { setEventTodo } from "../../actions/index";
import { useRef } from 'react';   // 레퍼런스 훅스

const timeToPixel = (time:DateTime):number=>{
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
  const start = DateTime.fromISO(event.startTime);
  const end = DateTime.fromISO(event.endTime);
  const startPixel = timeToPixel(start);
  const interval = Interval.fromDateTimes(start, end);
  const intervalPixel = 48 * interval.length("hour");
  const position = {
    top: startPixel,
    height: intervalPixel,
    backgroundColor: event.colour
  };

  const componentRef = useRef<HTMLDivElement>(null);  //  ref타입 설정
  const dispatch = useDispatch();
  const eventHandler = () =>{
    if( componentRef.current?.getBoundingClientRect() ) {
      let x:number,y:number;
      x = componentRef.current?.getBoundingClientRect().x;
      y = componentRef.current?.getBoundingClientRect().y;
      dispatch(setEventTodo(true,[x,y],event.eventId,event.calendarId,event.userId,event.access))
    } 
  }

  return (
    <div className="event-con" style={position} ref={componentRef} onClick={()=>{eventHandler()}}>
      <div className="event-text-con">
        {/* 30분짜리면 span 1시간 이상이면 div 인데 */}
        <div className="event-text-title-con">
          <span className="event-text-title">{event.eventName}</span>
        </div>
        <div className="event-text-time">
          {start.toFormat("HH:mm")+"~"+end.toFormat("HH:mm")}
        </div>
      </div>
    </div>
  );
};

const Day = ({ day }: any) => {
  let events:EventType[]=[] ;

  data.calendar.forEach((cal:any)=>{      // 모든 캘린더의 이벤트들을 하나의 배열안에 넣음

    cal.event.forEach((event:any)=>{          // 하나의 이벤트에 캔린더id 유저id 넣어 가공했음 (속성으로 전달할때 간편하게 전달하기 위해서)
      event.calendarId =cal.calendarId;
      event.userId = data.userId;
    })
    events = [...events,...cal.event]
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