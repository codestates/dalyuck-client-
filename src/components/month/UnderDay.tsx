import { DateTime } from 'luxon';
import { useRef } from 'react';   // 레퍼런스 훅스
import { setEventTodo } from "../../actions/index";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const UnderDay = ({event}:{event:any}) => {   // 월간에 쓰이는 종일 아닌 몇시간 짜리 이벤트 

  const { user } =useSelector((state:RootState)=>state.userReducer);
  let time = DateTime.fromISO(event.startTime).toFormat('t');
  let name:string = '';

  const componentRef = useRef<HTMLDivElement>(null);  //  ref타입 설정
  const dispatch = useDispatch();
  const eventHandler = () =>{
    if( componentRef.current?.getBoundingClientRect() ) {
      let x:number,y:number;
      x = componentRef.current?.getBoundingClientRect().x;
      y = componentRef.current?.getBoundingClientRect().y;
      if(event.todolistId){
        dispatch(setEventTodo(true,[x,y],'todo',undefined,event))
      }else{
        dispatch(setEventTodo(true,[x,y],'event',event,undefined))
      }
    } 
  }

  if(event.eventName){
    name = event.eventName;
  }else{
    name = event.todoName;
  }

  let color = '';
  if(event.colour){
    color = event.colour;
    user.calendar.forEach(cal=>{
      if(cal.id === event.calendarId) color=cal.colour;
    })
    user.otherCalendars.forEach(cal=>{
      if(cal.id === event.otherCalendarId) color=cal.colour;
    })
  }

  return (
    <div className="under-day" ref={componentRef} onClick={()=>{eventHandler()}}>
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

export default UnderDay;