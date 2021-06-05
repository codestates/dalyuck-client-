import MaincalendarMonth  from "../components/month/MainCalendarMonth";
import Sidebar from "./sideBar/Sidebar";
import { useSelector} from 'react-redux'
import { RootState } from '../reducers/index'
import MainCalendarDayWeek from "../components/dayWeek/MainCalendarDayWeek";
import CalendarOption from './CalendarOption';
import CreateEvent from "../components/CreateEvent";
import EventInfoCon from "./EvnetInfoCon";
import MakeEventTodo from './MakeEventTodo';

export default function MainBody(){

    const {base, colorOption, eventTodo, makeEventTodo} = useSelector((state:RootState) => state.userReducer);

    return(
        <div className="main-body" >
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
            {
                makeEventTodo.isMakeBtnClick ? (
                    <MakeEventTodo/>
                ):(
                    null
                )

            }
            <CreateEvent/>
        </div>
    )
}