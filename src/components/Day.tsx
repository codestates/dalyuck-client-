import { DateTime, Interval } from 'luxon';
import {events} from '../fakeData/Events';
const timeToPixel = (time:DateTime):number=>{
  const minute = time.minute;
  const hour = time.hour;
  const conmponentHeight = 1153;

  const heightPx = conmponentHeight*((hour+(minute/60))/24)
  return heightPx
}

const Redline = ({height}:any)=>{
  console.log(height)
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
  return (
    <div className="event-con" style={position}>
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

const Day = ({ dayNum }: any) => {
  const now = DateTime.now(); //  현재시간
  const height = timeToPixel(now);
  const isToday = dayNum === now.day;
  const dayEvent = events.filter((event) => {
    return DateTime.fromISO(event.startTime).day === dayNum;
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