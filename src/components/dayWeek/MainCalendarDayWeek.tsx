import DayWeekHead from './DayWeekHead';
import BackgroundGrid from './BackgroundGrid';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/index';
import { makeDayInfoArr } from '../../functions/Calendar'

const MainCalendarDayWeek = () => {

    const {base} = useSelector( (state:RootState) => state.userReducer )
    const dayInfoArr = makeDayInfoArr(base)


    return(
        <div className="main-calendar">
            <DayWeekHead info={dayInfoArr}/>
            <BackgroundGrid info={dayInfoArr}/>
        </div>
    )
}

export default MainCalendarDayWeek;