import { useRef } from 'react';   // 레퍼런스 훅스
import { setEventTodo } from "../actions/index";
import { useDispatch } from 'react-redux'

export default function AllDay({event}:{event:any}) {
  let name:string = '';
  if(event.todolistId){
    name = event.toDoName;
  }else{
    name = event.eventName;
  }
  
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
    return (
      <div className="all-day" ref={componentRef} onClick={()=>{eventHandler()}}>
        <div className="all-day__inner" style={{backgroundColor:event.colour}}>
          <span className="all-day-span">
            <span className="all-day-span__inner">{name}</span>
          </span>
        </div>
      </div>
    );
  }