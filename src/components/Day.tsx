import { DateTime } from 'luxon';

const timeToPixel = (time:DateTime):number=>{
  const minute = time.minute;
  const hour = time.hour;
  const conmponentHeight = 1153;

  const heightPx = conmponentHeight*((hour+(minute/60))/24)
  return heightPx
}

const Redline = ({height}:any)=>{
  console.log(height)
  return (
    <div>
      <div className = "tody-time-line" style ={{top: height + 'px'}}/>
      <div className = "today-time-dot" style ={{top: height + 'px'}}/>
    </div>
  )

}

const Day = ({isToday}:any) => {
  // const now = DateTime.now()   //  현재시간
  const tenOClock = DateTime.local(2021, 5, 19, 10, 40);  //임의 시간 지정

  const height = timeToPixel(tenOClock)
  console.log(isToday)
  return (
    <div className = "day-con">
      {
        isToday 
        ? <Redline height={height}/>
        : null
      }
      <div className = "day-con-1">
        <div className = "event-todo-con">  {/* 할일, 이벤트 컴포넌트 들어갈곳 */} 
        </div>
      </div>
    </div>
  )
  }

export default Day;