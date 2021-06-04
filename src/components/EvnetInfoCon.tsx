import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/index';
import { setEventTodo } from '../actions/index';
import { useOutSideClick } from '../functions/Calendar';
import { useRef } from 'react';
import { initEvent, initTodo } from '../reducers/InitialState';
import { DateTime, Interval } from 'luxon';
import { deleteEvent, deleteTodo } from '../functions/Axios';
import { useHistory } from "react-router";

const HasAccess = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { eventTodo } = useSelector((state:RootState)=>state.userReducer);
  const deleteHandelr = () => {
    if(eventTodo.isEvent==='event'){
      deleteEvent(eventTodo.event.id)
    }else{
      deleteTodo(eventTodo.todo.id, eventTodo.todo.todolistId)
    }
    dispatch(setEventTodo(false,[0,0],'',initEvent,initTodo))
  }
  
  return (
    <div className="event-option-access">
      <div className="event-option-access__name" onClick={()=>{history.push('/setting/createcalendar')}}>  {/**수정페이지로 수정 */}
        <div className="svg-icon-center">
          <div className="icon">
            <svg
              style={{ width: 24 + "px", height: 24 + "px" }}
              viewBox="-3 -3 30 30"
            >
              <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="event-option-access__delete" onClick={()=>{deleteHandelr()}}>
        <div className="svg-icon-center">
          <div className="icon">
            <svg
              style={{ width: 24 + "px", height: 24 + "px" }}
              viewBox="-3 -3 30 30"
            >
              <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
const EventOptionIcons = ({status}:{status:string}) => {

  const dispatch = useDispatch()

  const closeHandler = () => {
    dispatch(setEventTodo(false,[0,0],'',initEvent,initTodo))
  }

  return (
    <div className="event-option-icons">
      <div className="event-option-close" onClick={()=>{closeHandler()}}>
        <div className="svg-icon-center">
          <div className="icon">
            <svg
              style={{ width: 24 + "px", height: 24 + "px" }}
              viewBox="-3 -3 30 30"
            >
              <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </div>
        </div>
      </div>
      {
        status.length === 0 ? (
            <HasAccess />
          ):
          (
            null
          )
      }
    </div>
  );
};

const EventInfo = ({eventTodo, status}:{eventTodo:any,status:string}) => {

  let startTime:string = '';
  let endTime:string = '';
  let name:string = '';
  let color:string = '';
  console.log(eventTodo)
  if(eventTodo.event){
    startTime = eventTodo.event.startTime;
    endTime = eventTodo.event.endTime;
    name = eventTodo.event.eventName;
    color = eventTodo.event.colour;
  }else{
    startTime = eventTodo.todo.startTime;
    endTime = eventTodo.todo.endTime;
    name = eventTodo.todo.eventName;
    color = eventTodo.todo.colour;
  }
  
  let isAllday = Interval.fromDateTimes(DateTime.fromISO(startTime),DateTime.fromISO(endTime)).count('hour') >= 24  
  let date = DateTime.fromISO(startTime).toFormat("M월 d일");
  startTime = DateTime.fromISO(startTime).toFormat("t");
  endTime = DateTime.fromISO(endTime).toFormat("t");

  return (
    <div className="event-info">
      <div className="event-info-color">
        <span className="event-info-color__inner">
          <div className="event-info-color__shape" style={{backgroundColor:color}}/>
        </span>
      </div>
      <div className="event-info-text">
        <div className="event-info-text__inner">
          <div className="event-info-text__subject">
            <div className="event-info-text__subject-span">{name}</div>
          </div>
          <div className="event-info-text__time">
            {date}
            <span className="event-info-text__time-dot">⋅</span>
            {
              isAllday ? (<span className="event-info-text__time-span">종일</span>
              ):(  
              <span className="event-info-text__time-span">{startTime+"~"+endTime}</span>
              )
            }
            {
              status.length > 0 ? (
                <div className="event-margin">
                  <span className="event-info-text__time-span">{status}</span>
                </div>
              ):(
                null
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EventInfoCon() {

  const { user } = useSelector((state:RootState)=>state.userReducer);
  const dispatch = useDispatch()
  const closeRef = useRef(null);
  const callback = ()=>{dispatch(setEventTodo(false,[0,0],'',initEvent,initTodo))}
  useOutSideClick(closeRef, callback) // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

  const { eventTodo } = useSelector( (state:RootState) => state.userReducer)
  const position={
    top: eventTodo.position[1]-160,
    left: eventTodo.position[0]<60 ? (eventTodo.position[0]-40):( eventTodo.position[0]-330)
  }

  let status:string = '';          // 구독했는지 참가했는지 내가 만든 이벤트인지 구분하기 위한 변수.
  console.log(eventTodo)
  if( eventTodo.isEvent === 'event'){

    if(eventTodo.event.otherCalendarId){
      user.otherCalendars.forEach(cal=>{
        if(cal.id===eventTodo.event.otherCalendarId) status = `( 구독중 ) ${cal.calendarName}`;
      })
    }else{
      let resultEvent;
      let resultCal = user.calendar.find(cal=>{
        return cal.id === eventTodo.event.calendarId;
      })
      if(resultCal) {
        resultEvent = resultCal.events.find(event=>{
          return event.id === eventTodo.event.id;
        })
      }

      if( !(resultCal && resultEvent) ) status = '( 참가중 )'
    }
  }
  
  return (
    <div className="event-info-con" style={position} ref={closeRef}>
      <div className="event-info-con__inner">
        <EventOptionIcons status={status} />   {/*일단 항상 트루 수정 관한 */}
        <div className="event-info-con-body">
          <EventInfo eventTodo={eventTodo} status={status}/>
        </div>
      </div>
    </div>
  );
}