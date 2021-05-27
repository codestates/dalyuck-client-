import { makeDayInfoArr } from '../../functions/Calendar'
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/index';
import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';

const weekdayArr = ["일", "월", "화", "수", "목", "금", "토"];

const MiniCalendarHeader = ({ day }: { day: string }) => {
  return (
    <span className="mini-calendar__header__span-inner">
      <span className="mini-calendar__header__span">{day}</span>
    </span>
  );
};
const MiniWeekDay = ({ day }: { day: DateTime }) => {

  let {base} = useSelector( (state:RootState) => state.dateReducer )

  let isToday = day.toFormat("D")===DateTime.now().toFormat("D")
  let isBase = DateTime.fromISO(base.baseDate).toFormat("D") === day.toFormat("D")
  
  return (
    <span className="mini-week__day">
      <div className={"mini-week__day__text"+ ( isBase? ' base': "" ) + (isToday ? ' today':'')}>{day.day}</div>
    </span>
  );
};

const MiniWeek = (props:{headerDay:DateTime[]}) => {
  let headerDay=props.headerDay
  return (
    <div className="mini-week">
      {/* 1,2,3,4, 매핑... */}
      {headerDay.map((day) => {
        return <MiniWeekDay key={day.day} day={day} />;
      })}
    </div>
  );
};
export default function MiniCalendar() {

  let {base} = useSelector( (state:RootState) => state.dateReducer )

  useEffect(()=>{
    setMiniBase(base)
   },[base])

  base = {...base,basePeriod:'month'}

  const [miniBase, setMiniBase ] = useState(base)

  let weekInfoArr = makeDayInfoArr(miniBase)

  const prevMiniNavHandler = ()=>{
    setMiniBase({...miniBase,
      baseDate: DateTime.fromISO(miniBase.baseDate).minus({month:1}).toISO()
    })
    weekInfoArr = makeDayInfoArr(miniBase)
  }
  const nextMiniNavHandler = ()=>{
    setMiniBase({...miniBase,
      baseDate: DateTime.fromISO(miniBase.baseDate).plus({month:1}).toISO()
    })
    weekInfoArr = makeDayInfoArr(miniBase)
  }

  return (
    <div className="mini">
      <div className="mini__inner">
        <div className="mini-nav">
          <span className="mini-nav__span"> {DateTime.fromISO(miniBase.baseDate).toFormat("y년 M월")} </span>
          <div className="mini-nav__direction">
            <svg focusable="false" viewBox="0 0 24 24" onClick={()=>{ prevMiniNavHandler() }}>
              <path
                fill="currentColor"
                d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
              ></path>
            </svg>
          </div>
          <div className="mini-nav__direction">
            <svg focusable="false" viewBox="0 0 24 24" onClick={()=>{ nextMiniNavHandler() }}>
              <path
                fill="currentColor"
                d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mini-calendar">
          <div className="mini-calendar__header">
            {/* 일월화수목금토 헤더*/}
            {weekdayArr.map((day) => {
              return <MiniCalendarHeader key={day} day={day} />;
            })}
          </div>
          <div className="mini-calendar__body">
            {/* miniweek 매핑 ... */}
            {
              weekInfoArr.map((week:any,i:number)=>{
                return(
                  <MiniWeek key={i} headerDay={week}/>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}