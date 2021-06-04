import { DateTime } from 'luxon';
import { useRef } from 'react';   // 레퍼런스 훅스
import { setEventTodo } from "../../actions/index";
import { useDispatch } from 'react-redux';

export default function UnderDay(event:any) {   // 월간에 쓰이는 종일 아닌 몇시간 짜리 이벤트 
  let color = event.event.colour;
  let time = DateTime.fromISO(event.event.startTime).toFormat('t');
  let name:string = '';

  const componentRef = useRef<HTMLDivElement>(null);  //  ref타입 설정
  const dispatch = useDispatch();
  const eventHandler = () =>{
    if( componentRef.current?.getBoundingClientRect() ) {
      let x:number,y:number;
      x = componentRef.current?.getBoundingClientRect().x;
      y = componentRef.current?.getBoundingClientRect().y;
      if(event.event.todolistId){
        dispatch(setEventTodo(true,[x,y],'todo',undefined,event.event))
      }else{
        dispatch(setEventTodo(true,[x,y],'event',event.event,undefined))
      }
    } 
  }

  if(event.event.eventName){
    name = event.event.eventName;
  }else{
    name = event.event.todoName;
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