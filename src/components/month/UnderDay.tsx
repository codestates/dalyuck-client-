import { DateTime } from 'luxon';

export default function UnderDay(event:any) {   // 월간에 쓰이는 종일 아닌 몇시간 짜리 이벤트 
  let color = event.event.colour;
  let time = DateTime.fromISO(event.event.startTime).toFormat('t');
  let name:string = '';

  if(event.event.eventName){
    name = event.event.eventName;
  }else{
    name = event.event.todoName;
  }
  return (
    <div className="under-day" >
      <div className="under-day__inner">
        <div className="under-day__color-con">
          <div className="under-day__color" style={{borderColor:color}}></div>
        </div>
        <span className="under-day__text">
          <span className="under-day__text__time">{time}</span>
          <span className="under-day__text__subject">{name}</span>
        </span>
      </div>
    </div>
  );
}