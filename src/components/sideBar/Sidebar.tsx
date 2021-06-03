import CalendarList from "./CalendarsList";
import SidebarCalendars from "./SidebarCalendars";
import MiniCalendar from "./MiniCalendar";
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers/index';
import { useEffect, useState } from 'react';
// import { fakedata  } from "../../fakeData/Events";
import { useHistory } from "react-router";
import TodoLidst from './TodoList';

const  AddCalendar = ({isMine,calendars,isMyCalOpen}:{isMine:string,calendars:any,isMyCalOpen:boolean})=> {
  let history = useHistory();

  let otherCalNum = 0;
  if(calendars)  otherCalNum = Object.keys(calendars.calendar).length + 1;
  let otherTop = 39 +(otherCalNum*32);
  isMyCalOpen ?  otherTop = 39 +(otherCalNum*32) : otherTop = 39 ;
  let addTop:string = '';
  isMine === 'mine'? addTop = '5px' : addTop = `${otherTop}px` //10px 부분은 계산해서 other calendar

  const redirecHandler = () => {
    if(isMine === 'mine'){
      history.push('/setting/createcalendar')
    }
    else{
      history.push('/setting/requestsubcalendar')
    }
  }
  return (
    <div className="add-calendar" 
      style={ {position:'absolute' ,left:161 + 'px' ,top:addTop} }
      onClick = { () => { redirecHandler() } }
    >
      <span className="add-calendar__inner">
        <div className="add-calendar__span">
          <svg viewBox="-3 -3 30 30">
            <path d="M20 13h-7v7h-2v-7H4v-2h7V4h2v7h7v2z"></path>
          </svg>
        </div>
      </span>
    </div>
  );
}
export default function Sidebar() {
  const { user } = useSelector((state:RootState)=>state.userReducer);
  let [calendars, setcal] = useState(user)
  useEffect(()=>{
    setcal(user)
  },[user])
  
  let cals = calendars.calendar;
  let otherCals = calendars.otherCalendars;
  let todoList = calendars.todolist;

  const[isMyCalOpen, setIsMycalOpen] = useState(true);
  const[isOtherCalOpen, setIsOthercalOpen ] = useState(true);

  const {isSidebarOpen} = useSelector((state:RootState) => state.userReducer);

 

    return (
      <div className="sidebar" style={isSidebarOpen? {display:""}:{display:"none"}} >
        <div className="sidebar__inner">
          <div className="sidebar__inner-blank"></div>
          <div className="sidebar-body">
            {/* 미니달력 */}
                <MiniCalendar from={'side'}/>
            <div className="sidebar-body-calendar-list">
              <div className="sidebar-body-calendar-list__inner">
                {/* 내, 다른 컴포넌트 */}
                <SidebarCalendars myOrOther="my" setIsOpen={setIsMycalOpen} isOpen={isMyCalOpen} />
                {
                    cals && cals.map((calendar,i)=>{
                      return <CalendarList key={calendar.id+i} isOpen={isMyCalOpen} calendar={calendar} myOrOther="my"/>
                    })
                }

                {calendars && <TodoLidst isOpen={isMyCalOpen} calendar={todoList[0]} /> }
                <AddCalendar isMine="mine" calendars={calendars} isMyCalOpen={isMyCalOpen}/>
                <SidebarCalendars myOrOther="other" setIsOpen={setIsOthercalOpen} isOpen={isOtherCalOpen}/>
                {
                  otherCals ? (
                    otherCals.map((calendar,i)=>{
                    return <CalendarList key={calendar.id+i} isOpen={isOtherCalOpen} calendar={calendar} myOrOther="other"/>
                  })
                  ):(
                    null
                  )
                }
                <AddCalendar isMine="other"calendars={calendars} isMyCalOpen={isMyCalOpen}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }