import { makeDayInfoArr } from "../../functions/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../reducers/index";
import { DateTime } from "luxon";
import { useState, useEffect, useRef } from "react";
import {
  setBaseDate,
  setSelectStartDate,
  setIsSelectDateClick,
  setEndDate,
  setIsStartDateClick,
  setIsEndDateClick,
} from "../../actions/index";
import Tooltip from "@material-ui/core/Tooltip";
import { useOutSideClick } from "../../functions/Calendar";

const weekdayArr = ["일", "월", "화", "수", "목", "금", "토"];

const MiniCalendarHeader = ({ day }: { day: string }) => {
  return (
    <span className="mini-calendar__header__span-inner">
      <Tooltip
        title={
          <h1
            style={{
              color: "white",
              fontSize: "13px",
            }}
          >
            {day}요일
          </h1>
        }
      >
        <span className="mini-calendar__header__span">{day}</span>
      </Tooltip>
    </span>
  );
};

const MiniWeekDay = ({ day, from }: { day: DateTime; from: string }) => {
  const dispatch = useDispatch();
  let { base } = useSelector((state: RootState) => state.userReducer);
  let isToday = day.toFormat("D") === DateTime.now().toFormat("D");
  let isBase =
    DateTime.fromISO(base.baseDate).toFormat("D") === day.toFormat("D");

  function baseHandler() {
    if (from === "start" || from === "side") {
      dispatch(setBaseDate(day.toISO()));
      dispatch(setSelectStartDate(day.toISO().split("T")[0]));
    } else if (from === "end") {
      dispatch(setEndDate(day.toISO().split("T")[0]));
    }
    dispatch(setIsSelectDateClick(false));
    dispatch(setIsStartDateClick(false));
    dispatch(setIsEndDateClick(false));
  }

  return (
    <span
      className="mini-week__day"
      onClick={() => {
        baseHandler();
      }}
    >
      <div
        className={
          "mini-week__day__text" +
          (isBase ? " base" : "") +
          (isToday ? " today" : "")
        }
      >
        {day.day}
      </div>
    </span>
  );
};

const MiniWeek = ({
  headerDay,
  from,
}: {
  headerDay: DateTime[];
  from: string;
}) => {
  return (
    <div className="mini-week">
      {/* 1,2,3,4, 매핑... */}
      {headerDay.map((day) => {
        return <MiniWeekDay key={day.day} day={day} from={from} />;
      })}
    </div>
  );
};
export default function MiniCalendar({ from }: { from: string }) {
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  // const callback = ()=>{
  //   dispatch(setIsStartDateClick(false));
  //   dispatch(setIsEndDateClick(false));
  // }
  // useOutSideClick(selectRef, callback) // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

  let { base } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    setMiniBase(base);
  }, [base]);

  base = { ...base, basePeriod: "month" };

  const [miniBase, setMiniBase] = useState(base);

  let weekInfoArr = makeDayInfoArr(miniBase);

  const prevMiniNavHandler = () => {
    setMiniBase({
      ...miniBase,
      baseDate: DateTime.fromISO(miniBase.baseDate).minus({ month: 1 }).toISO(),
    });
    weekInfoArr = makeDayInfoArr(miniBase);
  };
  const nextMiniNavHandler = () => {
    setMiniBase({
      ...miniBase,
      baseDate: DateTime.fromISO(miniBase.baseDate).plus({ month: 1 }).toISO(),
    });
    weekInfoArr = makeDayInfoArr(miniBase);
  };

  return (
    <div className="mini" ref={selectRef}>
      <div className="mini__inner">
        <div className="mini-nav">
          <span className="mini-nav__span">
            {" "}
            {DateTime.fromISO(miniBase.baseDate).toFormat("y년 M월")}{" "}
          </span>
          <div className="mini-nav__direction">
            <Tooltip
              title={
                <h1
                  style={{
                    color: "white",
                    fontSize: "13px",
                  }}
                >
                  이전 달
                </h1>
              }
            >
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                onClick={() => {
                  prevMiniNavHandler();
                }}
              >
                <path
                  fill="currentColor"
                  d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                ></path>
              </svg>
            </Tooltip>
          </div>
          <div className="mini-nav__direction">
            <Tooltip
              title={
                <h1
                  style={{
                    color: "white",
                    fontSize: "13px",
                  }}
                >
                  다음 달
                </h1>
              }
            >
              <svg
                focusable="false"
                viewBox="0 0 24 24"
                onClick={() => {
                  nextMiniNavHandler();
                }}
              >
                <path
                  fill="currentColor"
                  d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                ></path>
              </svg>
            </Tooltip>
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
            {weekInfoArr.map((week: any, i: number) => {
              return <MiniWeek key={i} headerDay={week} from={from} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
