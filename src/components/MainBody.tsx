import MaincalendarMonth  from "../components/month/MainCalendarMonth";
import Sidebar from "./sideBar/Sidebar";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers/index'
import MainCalendarDayWeek from "../components/dayWeek/MainCalendarDayWeek";
import CalendarOption from './CalendarOption';
import CreateEvent from "../components/CreateEvent";
import EventInfoCon from "./EvnetInfoCon";
import MakeEventTodo from './MakeEventTodo';
import { setBasePeriod } from '../actions/index';

export default function MainBody(){

    const {base, colorOption, eventTodo, makeEventTodo} = useSelector((state:RootState) => state.userReducer);

    const dispatch = useDispatch();
    const shortCut = (e:React.KeyboardEvent<HTMLDivElement>)=>{
        console.log(e.key)
        e.persist();
        switch (e.key){
            case 'd':
                dispatch(setBasePeriod('day'))
            break
            case 'w':
                dispatch(setBasePeriod('week'))
            break
            case 'm':
                dispatch(setBasePeriod('month'))
            break
        }
    }
    // onKeyPress={shortCut} tabIndex={-1}
    
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