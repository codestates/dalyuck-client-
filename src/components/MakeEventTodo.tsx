import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/index';
import * as CSS from 'csstype';
import { useRef } from 'react'
import { useOutSideClick } from '../functions/Calendar';
import { setMakeEventTodo, setIsSelectDateClick, setIsStartTimeClick, setIsEndTimeClick } from '../actions/index';
import { DateTime } from 'luxon';
import  MiniCalendar  from './sideBar/MiniCalendar';
import SelectorTime from './selectorTime';
import { initStartTime, initEndTime } from '../reducers/InitialState';

const CheckBox = ({isAllday,setIsAllday}:{isAllday:boolean,setIsAllday:any}) => {

  return (
    <div className="check-box" style={{left:28}} onClick={()=>{setIsAllday(!isAllday)}}>
      <div className="check-box__inner" > 
        <div className="check-box__padding"></div>
        <div className="check-box__mid"></div>
        {
          isAllday ? (
            null
          ):(
            <div className="isChecked"/>
          )
        }
        <div className="check-box__bot">
          <div className="check-box-shape">
            <div className="check-box-shape__1"></div>
            <div className="check-box-shape__2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventTodoSwitch = ({isEvent, switchHandler}:{isEvent:boolean;switchHandler:Function}) => {
  return (
    <div className="event-todo-switch" onClick={()=>{switchHandler(!isEvent)}}>
      <div className={"switch"+ (isEvent ? " switch-on":'')}>
        <span className="switch__span">
          이벤트
        </span>
      </div>
      <div className={"switch"+ (isEvent ? "":" switch-on")}>
        <span className="switch__span">
          할 일
        </span>
      </div>
    </div>
  );
};
const DateTimeSelector = ({isAllday,setIsAllday}:{isAllday:boolean,setIsAllday:any}) => {

  const { makeEventTodo,base } = useSelector((state:RootState)=>state.userReducer)
  const { selectStartTime, selectEndTime, isSelectDateClick, isStartTimeClick, isEndTimeClick, selectEndDate} = makeEventTodo;
  const [ dateSpan, setDateSpan ] = useState( DateTime.fromISO(base.baseDate).toFormat("M월 d일") );
  const [ endDateSpan, setEndDateSpan ] = useState( DateTime.fromISO(selectEndDate).toFormat("M월 d일") );
  const dispatch = useDispatch();

  useEffect(()=>{         
    setDateSpan(DateTime.fromISO(base.baseDate).toFormat("M월 d일"));
  },[base])
  useEffect(()=>{         
    setEndDateSpan(DateTime.fromISO(selectEndDate).toFormat("M월 d일"));
  },[selectEndDate])

  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const startCallback = ()=>{dispatch(setIsStartTimeClick(false))};
  const endCallback = ()=>{dispatch(setIsEndTimeClick(false))};
  useOutSideClick(startTimeRef, startCallback);
  useOutSideClick(endTimeRef, endCallback);

  const miniCss:CSS.Properties = {
    position: 'absolute',
    backgroundColor: 'white',
    left: '52px',
    right: '137px',
    top: '221px',
    border: '#dadce0 1px solid',
    borderRadius: '10px'
    // boxShadow: '0 8px 10px 1px #e6e6e6 0 3px 14px 2px #e6e6e 0 5px 5px -3px #e6e6e6',
  }

  const startTimeCss:CSS.Properties = {
    position: 'absolute',
    left: '100px',
    top: '212px'
  }
  const endTimeCss:CSS.Properties = {
    position: 'absolute',
    left: '184px',
    top: '212px'
  }

  const startTimeHandler = () => {
    dispatch(setIsStartTimeClick(true))
  }
  const endTimeHandler = () => {
    dispatch(setIsEndTimeClick(true))
  }
  const makeTimeText = (date:string):string => {

    let timeSpan = "";
    if (DateTime.fromISO(date).hour < 12) {
      timeSpan = DateTime.fromISO(date).toFormat("오전 h:mm");
    } else {
      timeSpan = DateTime.fromISO(date).toFormat("오전 h:mm");
    }
    return timeSpan
  }
  
  
  return (
    <div className={"date-time-selector"} >
      <div className="basetime-select" onClick={()=>{ dispatch( setIsSelectDateClick(true) ) }}>
        <span className="basetime-select__span">{dateSpan}</span>
      </div>
      {
        isAllday ? (
          <div className="basetime-select" onClick={()=>{ dispatch( setIsSelectDateClick(true) ) }}>
            <span className="basetime-select__span">{endDateSpan}</span>
          </div>
        ):(
          <div className="time-select">
            <div className="time-select__inner" onClick={()=>{startTimeHandler()}}>
              <span className="time-select__span">{makeTimeText(selectStartTime)}</span>
            </div>
          <span>-</span>
            <div className="time-select__inner"onClick={()=>{endTimeHandler()}}>
              <span className="time-select__span">{makeTimeText(selectEndTime)}</span>
            </div>
          </div>
        )
      }

      {
        isSelectDateClick ? (
          <div style={miniCss}> <MiniCalendar from={isAllday? "end":"start"} /> </div>
        ):(
          null
        )
      }
      {
        isStartTimeClick ? (
          <div style={startTimeCss} ref={startTimeRef}> <SelectorTime isStart={"start"}/> </div>
        ):(
          null
        )
      }
      {
        isEndTimeClick ? (
          <div style={endTimeCss} ref={endTimeRef}> <SelectorTime isStart={"End"}/> </div>
        ):(
          null
        )
      }
    </div>
  );
};

const Attendants = () => {
  return(
    <div className="event__form">
      <svg className="event-svg" width="24px" height="24px" viewBox="0 0 24 24">
        <path d="M5 6C3.9 6 3 6.9 3 8S3.9 10 5 10 7 9.11 7 8 6.11 6 5 6M12 4C10.9 4 10 4.89 10 6S10.9 8 12 8 14 7.11 14 6 13.11 4 12 4M19 2C17.9 2 17 2.9 17 4S17.9 6 19 6 21 5.11 21 4 20.11 2 19 2M3.5 11C2.67 11 2 11.67 2 12.5V17H3V22H7V17H8V12.5C8 11.67 7.33 11 6.5 11H3.5M10.5 9C9.67 9 9 9.67 9 10.5V15H10V20H14V15H15V10.5C15 9.67 14.33 9 13.5 9H10.5M17.5 7C16.67 7 16 7.67 16 8.5V13H17V18H21V13H22V8.5C22 7.67 21.33 7 20.5 7H17.5Z" />
      </svg>
      <div>
        <input placeholder="참석자 추가" className="attendants__input" />
      </div>
    </div>
  )
}

export default function MakeEventTodo() {

  const [isEvent, setIsEvent] = useState(true);
  const [isAllday, setIsAllday ] = useState(false);

  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const callback = ()=>{dispatch(setMakeEventTodo(false, '', true, initStartTime, initEndTime ))};
  useOutSideClick(selectRef, callback) // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

  const position: CSS.Properties={   
    position: 'absolute',
    left: '409px',
    top: '173px'
  };
  

  const switchHandler = (e:boolean)=>{
    setIsEvent(e)
  }

  return (
    <div className="event__wrapper" style={position} ref={selectRef}>
      <div className="event__header" onClick={()=>{dispatch(setMakeEventTodo(false,'',true,initStartTime, initEndTime))}}>
        <button className="event__close__btn">&times;</button>
      </div>
      <div className="event__form" style={{ height: 60 + "px" }}>
        <svg className="event-svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path d="M5,4V7H10.5V19H13.5V7H19V4H5Z" />
        </svg>
        <input placeholder="( 제목 없음 )" className="title__input" />
      </div>
      <EventTodoSwitch isEvent={isEvent} switchHandler={switchHandler} />
      <div className="event__form">
        <svg className="event-svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z" />
        </svg>
        <DateTimeSelector isAllday={isAllday} setIsAllday={setIsAllday} />
        <CheckBox isAllday={isAllday} setIsAllday={setIsAllday}/>
        <span style={{paddingLeft:35}}>종일</span>
      </div>
        {
          isEvent ? (
            <Attendants/>
          ):(
            null
          )
        }
      <div className="event__textarea__form">
        <svg className="event-svg" width="24px" height="24px" viewBox="0 0 24 24">
          <path d="M3,9H17V7H3V9M3,13H17V11H3V13M3,17H17V15H3V17M19,17H21V15H19V17M19,7V9H21V7H19M19,13H21V11H19V13Z" />
        </svg>
        <textarea
          className="event__discription"
          placeholder="설명 추가"
        ></textarea>
      </div>
      <button className="event__submit__btn">저장</button>
    </div>
  );
}