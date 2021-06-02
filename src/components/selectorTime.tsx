import { DateTime } from "luxon";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/index'
import { setIsStartTimeClick, setStartTime, setEndTime, setIsEndTimeClick } from '../actions/index';

const SelectorPeriodSpanCon = ({ time, isStart }: { time: DateTime, isStart:string }) => {

  const dispatch = useDispatch();

  let timeSpan = "";
  if (time.hour < 12) {
    timeSpan = time.toFormat("오전 h:mm");
  } else {
    timeSpan = time.toFormat("오후 h:mm");
  }

  const selectHandler = ()=>{
    if(isStart==="start"){
      dispatch(setStartTime(time.toISO().split('T')[1]));
      dispatch(setIsStartTimeClick(false))
    }else{
      dispatch(setEndTime(time.toISO().split('T')[1]));
      dispatch(setIsEndTimeClick(false))
    }
  }

  return (
    <span className="selector-period__span" onClick={()=>{selectHandler()}}>
      <div className="select-list">
        <div className="select-list__left">{timeSpan}</div>
      </div>
    </span>
  );
};

const SelectorTime = ({isStart}:{isStart:string}) => {

  const { base, makeEventTodo } = useSelector((state:RootState)=>state.userReducer);

  let baseDate = DateTime.fromISO(base.baseDate);
  let timeArray: DateTime[] = [];

  let startOfDay = baseDate.startOf("day");
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      timeArray.push(startOfDay.plus({ hour: i, minute: 30 * j }));
    }
  }

  if(isStart !== 'start'){
    let i = 0;
    while(timeArray[i].toFormat("t") !== DateTime.fromISO(makeEventTodo.selectStartTime).toFormat("t")){
      timeArray.shift()
    }
  }

  return (
    <div className="selector">
      <div className="selector__inner">
        <div className="selector-time">
          {timeArray.map((time) => {
            return <SelectorPeriodSpanCon time={time} isStart={isStart} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectorTime;