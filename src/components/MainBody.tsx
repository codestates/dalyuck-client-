import MaincalendarMonth  from "../components/month/MainCalendarMonth";
import Sidebar from "../components/Sidebar";
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/index'
import MainCalendarDayWeek from "../components/dayWeek/MainCalendarDayWeek";


export default function MainBody(){
    const {base} = useSelector((state:RootState) => state.dateReducer);
    


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
            

        </div>
    )
}