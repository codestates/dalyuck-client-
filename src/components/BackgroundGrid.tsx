import Day from "./Day"

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
      <div className="hourBox">
        <span className="timeZone fontsetting">{timeSpan}</span>
      </div>
    );
  };



const Yscale = () => {
  return (
    <div>
      {
        times.map((time,i)=>{
          return <HourBox time={time}/>
        })
      }
    </div>
  );
}

const Timetable = ({info}:any) => {
  return(
      <div className="timetable">
          <div className="rowGridDayCon">
              <div className="rowGrid">
                {
                  times.map(()=>{
                    return <div className="rowGridLine"/>   //* 세로줄 24개 
                  })
                }
              </div>
              <div className="rowGridRight">

              </div>
              <div className="dayContainer">
                {
                  info.map((day:any)=>{
                    return <Day/>
                  })
                }  
              </div>
          </div>
      </div>
  )
}

const BackgroundGrid = ({info}:any) =>{
  return (
    <div className="yscaleTimetable">
      <Yscale/>
      <Timetable info={info}/>
    </div>
  )
}

export default BackgroundGrid