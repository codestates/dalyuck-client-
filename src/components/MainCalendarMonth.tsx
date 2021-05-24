import { makeDayInfoArr } from '../functions/Calendar'
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/index';
import { DateTime } from 'luxon';

const weekdayArr = ["일", "월", "화", "수", "목", "금", "토"];

const MonthColumnheader = ({ day }: { day: string }) => {

  return (
    <div className="month-columnheader">
      <span className="month-columnheader__span">{day}</span>
    </div>
  );
};

const MonthWeekheaderDay = ({ day }: { day: DateTime }) => {

  let isToday = day.toFormat("D")===DateTime.now().toFormat("D")
  let dayNum:number|string = day.day
  if( day.day === 1 ) dayNum = day.toFormat("M월 d일");

  return (
    <div className="month-week__header-day">
      <div className="month-week__header-day-inner" >
        <h2 className={"month-week__header-day-inner-h2"+ (isToday ? ' today':'')}>{dayNum}</h2>
      </div>
    </div>
  );
};

const WeekEvent = () => {
  return <div className="week-event">{/* 이벤트 할일 들어갈 곳 */}</div>;
};

const MonthWeek = (props:{headerDay:DateTime[]}) => {
  let headerDay=props.headerDay
  return (
    <div className="month-weeks__week">
      {/* 주단위 컴포넌트 매핑 */}
      <div className="month-weeks__header">
        {/* 2 3 4 5 6 날짜 헤더컴포 매핑 */}
        {headerDay.map((day) => {
          return <MonthWeekheaderDay key={day.day} day={day} />;
        })}
      </div>
      <div className="month-week__body">
        <div className="month-week__body-inner">
          {headerDay.map((event, i) => {
            return <WeekEvent key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default function MaincalendarMonth() {

  const {base} = useSelector( (state:RootState) => state.dateReducer )
  const weekInfoArr = makeDayInfoArr(base)

  return (
    <div className="calendar-month">
      <div className="calendar-month__inner">
        <div className="calendar-month__header">
          {/* 일월화수목금토 헤더*/}
          {weekdayArr.map((day) => {
            return <MonthColumnheader key={day} day={day} />;
          })}
        </div>
        <div className="month-weeks">
          {
            weekInfoArr.map((week:any)=>{
              return(
                <MonthWeek headerDay={week}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}