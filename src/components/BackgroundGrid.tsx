import Day from "./Day"
import {DateTime} from 'luxon';

type Time = {
  time:number;
}
const times = [...Array(24).keys()];

const HourBox = ({time}:Time) => {
  let timeSpan = '';
  if(time<=12){
    timeSpan = '오전 '+time.toString()+'시'
  }
  else{
    timeSpan = '오후 '+(time-12).toString()+'시'
  }
    return (
      <div className="hour-box">
        <span className="time-zone font-setting">{timeSpan}</span>
      </div>
    );
};



const Yscale = () => {
  return (
    <div className="hour-box-con">
      {
        times.map((time,i)=>{
          return <HourBox key={i} time={time}/>
        })
      }
    </div>
  );
}

const Timetable = ({info}:any) => {
  return(
      <div className="time-table">
          <div className="row-grid-day-con">
              <div className="row-grid">
                {
                  times.map((i)=>{
                    return <div key={i} className="row-grid-line"/>   //* 가로줄 24개 
                  })
                }
              </div>
              <div className="row-grid-right">

              </div>
              <div className="day-container">
                {
                  info.map(({day}:{day:DateTime})=>{
                    return <Day key={day} day={day}/>
                  })
                }  
              </div>
          </div>
      </div>
  )
}

const BackgroundGrid = ({info}:any) =>{
  return (
    <div className="scroll">
      <div className="yscale-timetable">
        <Yscale/>
        <Timetable info={info}/>
      </div>
    </div>
  )
}

export default BackgroundGrid