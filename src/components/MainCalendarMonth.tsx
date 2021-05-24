const weekdayArr = ["일", "월", "화", "수", "목", "금", "토"];
const headerDay = [25, 26, 27, 28, 29, 30, 1]; // 하드코딩, 정도 더 있어야할듯

const MonthColumnheader = ({ day }: { day: string }) => {
  return (
    <div className="month-columnheader">
      <span className="month-columnheader__span">{day}</span>
    </div>
  );
};

const MonthWeekheaderDay = ({ dayNum }: { dayNum: number }) => {
  return (
    <div className="month-week__header-day">
      <div className="month-week__header-day-inner">
        <h2 className="month-week__header-day-inner-h2">{dayNum}</h2>
      </div>
    </div>
  );
};

const WeekEvent = () => {
  return <div className="week-event">{/* 이벤트 할일 들어갈 곳 */}</div>;
};

const MonthWeek = () => {
  return (
    <div className="month-weeks__week">
      {" "}
      {/* 주단위 컴포넌트 매핑 */}
      <div className="month-weeks__header">
        {/* 2 3 4 5 6 날짜 헤더컴포 매핑 */}
        {headerDay.map((dayNum) => {
          return <MonthWeekheaderDay key={dayNum} dayNum={dayNum} />;
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

export default function App() {
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
          <MonthWeek />
          <MonthWeek />
          <MonthWeek />
          <MonthWeek />
        </div>
      </div>
    </div>
  );
}