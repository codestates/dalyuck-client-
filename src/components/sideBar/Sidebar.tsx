import CalendarList from "./CalendarsList";
import SidebarCalendars from "./SidebarCalendars";
import MiniCalendar from "./MiniCalendar";
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers/index';
import { useEffect, useState } from 'react';
import { fakedata  } from "../../fakeData/Events";
import { useHistory } from "react-router";

export default function Sidebar() {
  let history = useHistory();

  const { data } = useSelector((state:RootState)=>state.userReducer);
  let [cal, setcal] = useState(data) 
  useEffect(()=>{
    setcal(data)
  },[data])
  let calendars = cal.calendar;   // 페이크 데이터
  let otherCalendars = fakedata.OtherCalendar;
  const[isMyCalOpen, setIsMycalOpen] = useState(true);
  const[isOtherCalOpen, setIsOthercalOpen ] = useState(true);

  const {isSidebarOpen} = useSelector((state:RootState) => state.userReducer);

  const  AddCalendar = ({isMine}:{isMine:string})=> {

    let otherCalNum = Object.keys(calendars).length
    let otherTop = 39 +(otherCalNum*32);
    isMyCalOpen ?  otherTop=39 +(otherCalNum*32) : otherTop = 39 ;
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
                  calendars ? (
                    calendars.map((calendar,i)=>{
                      return <CalendarList key={i} isOpen={isMyCalOpen} calendar={calendar}/>
                    })
                  ):(
                    null
                  )
                }

                <AddCalendar isMine="mine"/>
                <SidebarCalendars myOrOther="other" setIsOpen={setIsOthercalOpen} isOpen={isOtherCalOpen}/>
                {
                  otherCalendars ? (
                    otherCalendars.map((calendar,i)=>{
                    return <CalendarList key={i} isOpen={isOtherCalOpen} calendar={calendar}/>
                  })
                  ):(
                    null
                  )
                }
                <AddCalendar isMine="other"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }