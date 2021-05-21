import DayWeekHead from './DayWeekHead';
import BackgroundGrid from './BackgroundGrid';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/index';
import {DateTime} from 'luxon';

const MainCalendarDayWeek = () => {

    interface DayInfoHead {
        yoil:string;
        day:number;
    }
    
    const yoilArr = ['월','화','수','목','금','토','일'];
    const {base} = useSelector( (state:RootState) => state.dateReducer)
    const baseDate = DateTime.fromISO(base.baseDate)
    const startOfWeek = baseDate.startOf('week').minus({day:1})   // 배이스 기준날의 시작 날짜 디폴트값은 오늘
    const dayInfoArr:DayInfoHead[] = [];

    
    for(let i = 0 ; i<7 ; i++){                // 주의 첫 날을 기준으로 요일 정보를 가진 배열을 만든다. ex) [{'일',16},{'월',17},{'화',18}...]
        let weekinfo = startOfWeek.plus({day:i})       
        dayInfoArr.push({yoil:yoilArr[weekinfo.weekday-1], day: weekinfo.day})
    }

    return(
        <div>
            <DayWeekHead info={dayInfoArr}/>
            <BackgroundGrid info={dayInfoArr}/>
        </div>
    )
}

export default MainCalendarDayWeek;