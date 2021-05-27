import MaincalendarMonth  from "../components/month/MainCalendarMonth";
import Sidebar from "./sideBar/Sidebar";
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/index'
import MainCalendarDayWeek from "../components/dayWeek/MainCalendarDayWeek";
import CalendarOption from './CalendarOption';
import CreateEvent from "../components/CreateEvent";
import EventInfoCon from "./EvnetInfoCon";

export default function MainBody(){

    const {base,colorOption,eventTodo} = useSelector((state:RootState) => state.dateReducer);

    return(
        <div className="main-body">
            <Sidebar/>
            {
                base.basePeriod==='month' ? (
                    <MaincalendarMonth/>
                ):(
                    <MainCalendarDayWeek/>
                )
            }
            {
                colorOption.isOptionClick ? (
                    <CalendarOption/>
                ):(
                    null
                )

            }
            {
                eventTodo.isEventClick ? (
                    <EventInfoCon/>
                ):(
                    null
                )
            }
            <CreateEvent/>
        </div>
    )
}