type Time = {
  time:number;
}

const HourBox = ({time}:Time) => {
    return (
      <div className="hourBox">
        <span className="timeZone"> 오전 {time}시 </span>
      </div>
    );
  };

const times = [...Array(24).keys()];

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

export default Yscale