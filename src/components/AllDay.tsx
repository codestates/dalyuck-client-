import { useRef } from 'react';   // 레퍼런스 훅스
import { setEventTodo } from "../actions/index";
import { useDispatch } from 'react-redux'

export default function AllDay({event}:{event:any}) {

  const componentRef = useRef<HTMLDivElement>(null);  //  ref타입 설정
  const dispatch = useDispatch();
  const eventHandler = () =>{
    if( componentRef.current?.getBoundingClientRect() ) {
      let x:number,y:number;
      x = componentRef.current?.getBoundingClientRect().x;
      y = componentRef.current?.getBoundingClientRect().y;
      dispatch(setEventTodo(true,[x,y],event))
    } 
  }
    return (
      <div className="all-day" ref={componentRef} onClick={()=>{eventHandler()}}>
        <div className="all-day__inner" style={{backgroundColor:event.colour}}>
          <span className="all-day-span">
            <span className="all-day-span__inner">{event.eventName}</span>
          </span>
        </div>
      </div>
    );
  }