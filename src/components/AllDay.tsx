import { useRef } from 'react';   // 레퍼런스 훅스
import { setEventTodo } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers';

export default function AllDay({event}:{event:any}) {

  const { user } = useSelector((state:RootState)=>state.userReducer);

  let name:string = '';
  if(event.todolistId){
    name = event.toDoName;
  }else{
    name = event.eventName;
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
  if(event.todolistId){
    color = user.todolist[0].colour;
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
        <div className="all-day__inner" style={{backgroundColor:color}}>
          <span className="all-day-span">
            <span className="all-day-span__inner">{name}</span>
          </span>
        </div>
      </div>
    );
  }