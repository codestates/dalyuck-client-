import CalendarList from "./CalendarsList";
import SidebarCalendars from "./SidebarCalendars";
import MiniCalendar from "./MiniCalendar";
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/index';

export default function Sidebar() {
  const {isSidebarOpen} = useSelector((state:RootState) => state.dateReducer);
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
                <SidebarCalendars/>
                <CalendarList/>
                <SidebarCalendars/>
                <CalendarList/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }