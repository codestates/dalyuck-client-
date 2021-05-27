import CalendarList from "./CalendarsList";
import SidebarCalendars from "./SidebarCalendars";
import MiniCalendar from "./MiniCalendar";
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers/index';
import { useState } from 'react';
import { data  } from "../../fakeData/Events";

export default function Sidebar() {
  let calendars = data.calendar;   // 페이크 데이터
  const[isMyCalOpen, setIsMycalOpen] = useState(true);
  const[isOtherCalOpen, setIsOthercalOpen ] = useState(true);

  const {isSidebarOpen} = useSelector((state:RootState) => state.dateReducer);

  const  AddCalendar = ({isMine}:{isMine:string})=> {

    let addTop:string = '';
    isMine === 'mine'? addTop = '3px' : addTop = "10px" //10px 부분은 계산해서 other calendar

    return (
      <div className="add-calendar" style={ {position:'absolute' ,left:161 + 'px' ,top:addTop} }>
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
                <MiniCalendar/>
            <div className="sidebar-body-calendar-list">
              <div className="sidebar-body-calendar-list__inner">
                {/* 내, 다른 컴포넌트 */}
                <SidebarCalendars myOrOther="my" setIsOpen={setIsMycalOpen} isOpen={isMyCalOpen} />
                {
     
                  calendars.map((calendar,i)=>{
                    return <CalendarList key={i} isOpen={isMyCalOpen} calendar={calendar}/>
                  })
                }

                <AddCalendar isMine="mine"/>
                <SidebarCalendars myOrOther="other" setIsOpen={setIsOthercalOpen} isOpen={isOtherCalOpen}/>
                {/* {
                  calendars.map(calendar=>{
                    return <CalendarList isOpen={isMyCalOpen} calendar={calendar}/>
                  })
                } */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }