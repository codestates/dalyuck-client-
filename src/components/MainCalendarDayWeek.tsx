import DayWeekHead from './DayWeekHead';
import BackgroundGrid from './BackgroundGrid';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/index';
import {DateTime} from 'luxon';

const MainCalendarDayWeek = () => {

    interface DayInfoHead {
        yoil:string;
        day:DateTime;
    }
    
    const yoilArr = ['월','화','수','목','금','토','일'];
    const {base} = useSelector( (state:RootState) => state.dateReducer)
    const baseDate = DateTime.fromISO(base.baseDate)
    let startOfWeek:DateTime;
    if(baseDate.weekday===7){        // 기준 날이 일요일이면 주의 시작날은 일요일
        startOfWeek = baseDate
    }else{
        startOfWeek = baseDate.startOf('week').minus({day:1})   // 일요일을 제외한날의 주 의 시작요일은 월요일이라 월요일 -1
    }
   
    let dayInfoArr:DayInfoHead[] = [];


    switch(base.basePeriod){          // 일간 주간 월간에 따라서 랜더링 할때 필요한 배열 다르게
        case 'day':
            dayInfoArr = [{yoil:yoilArr[baseDate.weekday-1], day:baseDate}]
            break

        case 'week':
            for(let i = 0 ; i<7 ; i++){                // 주의 첫 날을 기준으로 요일 정보를 가진 배열을 만든다. ex) [{'일','그 날 시간정보'},{'월',17},{'화',18}...]
                let weekinfo = startOfWeek.plus({day:i})       
                dayInfoArr.push({yoil:yoilArr[weekinfo.weekday-1], day: weekinfo})
            }
            break

        case 'month':
            console.log('월간은 다음에')
            break
    }
    


    return(
        <div className="sidebar-calendar">
            <DayWeekHead info={dayInfoArr}/>
            <BackgroundGrid info={dayInfoArr}/>
        </div>
    )
}

export default MainCalendarDayWeek;