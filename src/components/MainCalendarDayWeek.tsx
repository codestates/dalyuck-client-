import DayWeekHead from './DayWeekHead';
import BackgroundGrid from './BackgroundGrid';
import {DateTime} from 'luxon';
import React from 'react';

interface DayInfoHead {
    yoil:string;
    day:number;
}

const yoilArr = ['월','화','수','목','금','토','일'];
const now = DateTime.now()
const startOfWeek = now.startOf('week').minus({day:1})   // 이번주 시작 일요일 날짜 
const dayInfoArr:DayInfoHead[] = [];

for(let i = 0 ; i<7 ; i++){                // 주의 첫 날을 기준으로 요일 정보를 가진 배열을 만든다. ex) [{'일',16},{'월',17},{'화',18}...]
    let weekinfo = startOfWeek.plus({day:i})       
    dayInfoArr.push({yoil:yoilArr[weekinfo.weekday-1], day: weekinfo.day})
}

const MainCalendarDayWeek = () => {
    return(
        <div>
            <DayWeekHead info={dayInfoArr}/>
            <BackgroundGrid info={dayInfoArr}/>
        </div>
    )
}

export default MainCalendarDayWeek;