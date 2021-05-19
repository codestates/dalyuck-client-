import { DateTime } from "luxon";

interface DayInfoHead {
    yoil:string;
    day:number;
}

const DateInfo = ({yoil, day}:DayInfoHead) => {                  // (주,일) 메인 달력에서 헤더  ex)월,13 표시하는곳
    let isToday = day===DateTime.now().day

    return(
        <div className = "date-info">
            <div className = "date-info-text-box-con">
                <div className = "extand-grid-left"/>
                <h2 className = "date-info-text-box">
                    <div className = {"yoil"+(isToday ? ' today':'')}>
                        {yoil}
                    </div>
                    <div className = {"myuchil"+(isToday ? ' today':'')}>
                        {day}
                    </div>
                </h2>
            </div>
        </div>
    )
}

const DayWeekHead = ({info}:any) => {

    return(
        <div className = "main-calender-head" >
            <div className = "head-left-blank"></div>
            <div className = "one-day-info-con">
                <div className = "date-info-con">
                    <div className = "info-left-blank"></div>
                    {
                        info.map((day:{yoil:string; day:number;})=>{
                            return  <DateInfo yoil={day.yoil} day={day.day}/>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DayWeekHead;