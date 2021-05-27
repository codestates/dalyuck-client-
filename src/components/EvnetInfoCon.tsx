import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers/index';
import { setEventTodo } from '../actions/index';
import { useOutSideClick } from '../functions/Calendar';
import { useRef } from 'react';
const HasAccess = () => {
    return (
      <div className="event-option-access">
        <div className="event-option-access__name">
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
        <div className="event-option-access__delete">
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
  const EventOptionIcons = ({access}:{access:boolean}) => {



    const dispatch = useDispatch()

    const closeHandler = () => {
      dispatch(setEventTodo(false,[0,0],0,0,0,false))
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
          access ? (<HasAccess />):(null)
        }
      </div>
    );
  };
  
  const EventInfo = () => {

    return (
      <div className="event-info">
        <div className="event-info-color">
          <span className="event-info-color__inner">
            <div className="event-info-color__shape"></div>
          </span>
        </div>
        <div className="event-info-text">
          <div className="event-info-text__inner">
            <div className="event-info-text__subject">
              <div className="event-info-text__subject-span">제목 없음</div>
            </div>
            <div className="event-info-text__time">
              5월 25일
              <span className="event-info-text__time-dot">⋅</span>
              <span className="event-info-text__time-span">오후 2:15~ 4:45</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default function EventInfoCon() {

    const dispatch = useDispatch()
    const closeRef = useRef(null);
    const callback = ()=>{dispatch(setEventTodo(false,[0,0],0,0,0,false))}
    useOutSideClick(closeRef, callback) // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

    const { eventTodo } = useSelector( (state:RootState) => state.dateReducer)
    const position={
      top: eventTodo.position[1]-36,
      left: eventTodo.position[0]>250 ? (eventTodo.position[0]-223):( eventTodo.position[0])
    }
    
    return (
      <div className="event-info-con" style={position} ref={closeRef}>
        <div className="event-info-con__inner">
          <EventOptionIcons access={eventTodo.access}/>
          <div className="event-info-con-body">
            <EventInfo />
          </div>
        </div>
      </div>
    );
  }