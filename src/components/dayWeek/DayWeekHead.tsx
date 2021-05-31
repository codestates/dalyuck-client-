import { DateTime, Interval } from "luxon";
import { useDispatch } from "react-redux";
import { setBaseDate, setBasePeriod } from "../../actions/index";
import AllDay from '../AllDay';
import {data,EventType}  from '../../fakeData/Events';
import { useState } from 'react';
interface DayInfoHead {
    yoil:string;
    day:DateTime;
}

const DateInfo = ({yoil, day}:DayInfoHead) => {                  // (주,일) 메인 달력에서 헤더  ex)월,13 표시하는곳

    const dispatch = useDispatch();
    let isToday = day.toFormat("D")===DateTime.now().toFormat("D")

    const baseHandler = () => {
        dispatch(setBaseDate(day.toISO()))
        dispatch(setBasePeriod('day'))
    }

    return(
        <div className = "date-info">
            <div className = "date-info-text-box-con">
                <div className = "extand-grid-left"/>
                <h2 className = "date-info-text-box">
                    <div className = {"yoil"+(isToday ? ' yoiltoday':'')}>
                        {yoil}
                    </div>
                    <div className = {"myuchil"+(isToday ? ' today':'')} onClick={()=>{baseHandler()}}>
                        {day.day}
                    </div>
                </h2>
            </div>
        </div>
    )
}

const AllDayCon = ({day, allDayEvents, setAllDayEvents}:{day:DateTime;allDayEvents:EventType[];setAllDayEvents:any})=>{


    return(
        <div className="all-day-con">
            {
                allDayEvents.map((event:EventType)=>{
                    let startTime = DateTime.fromISO(event.startTime).startOf('day');
                    let endTime = DateTime.fromISO(event.endTime).endOf('day');
                    if(Interval.fromDateTimes(startTime,endTime).contains(day)) {
                        return <AllDay event={event}/>
                    }
                })
            }
        </div>
    )
}


const DayWeekHead = ({info}:any) => {

    let events:EventType[]=[] ;
    data.calendar.forEach((cal:any)=>{      // 모든 캘린더의 이벤트들을 하나의 배열안에 넣음

        cal.event.forEach((event:any)=>{          // 하나의 이벤트에 캔린더id 유저id 넣어 가공했음 (속성으로 전달할때 간편하게 전달하기 위해서)
          event.calendarId =cal.calendarId;
          event.userId = data.userId;
        })
        events = [...events,...cal.event]
    });

    let filteredEvent:EventType[] = [];  // 하루이상 종일 이벤트 필터링
    events.forEach((event)=>{
        let startTime = DateTime.fromISO(event.startTime);
        let endTime = DateTime.fromISO(event.endTime);
        let result = (Interval.fromDateTimes(startTime,endTime).count('hour') >= 24)
        if(result) filteredEvent.push(event)
    })

    const [allDayEvents, setAllDayEvents ] = useState(filteredEvent)

    return(
        <div className = "main-calender-head" >
            <div className = "head-left-blank"></div>
            <div className = "one-day-info-con">
                <div className = "date-info-con">
                    <div className = "info-left-blank"></div>
                    {
                        info.map(({yoil, day}:{yoil:string;day:DateTime;})=>{
                            return  <DateInfo key={yoil} yoil={yoil} day={day}/>
                        })
                    }
                    <div className = "info-rigth-box"></div>
                </div>
                <div className="all-day-event-con">
                    <div className="info-left-blank"></div>
                    <div className="all-day-event-con-1">
                        <div className="all-day-event-con-2">
                            <div className="all-day-event-con-3">
                                {/* // 종일 컴포넌트 들거갈 공각 */}
                                {
                                    info.map(({day}:{day:DateTime})=>{
                                        return <AllDayCon day={day} allDayEvents={allDayEvents} setAllDayEvents={setAllDayEvents}/>
                                    })
                                }
                                <div className="main-cal-blank" style={{width:7+'px'}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-cal-blank"/>
        </div>
    )
}

export default DayWeekHead;