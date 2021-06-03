export default function UnderDay(event:any) {   // 월간에 쓰이는 종일 아닌 몇시간 짜리 이벤트 
  let color = event.event.colour;
  return (
    <div className="under-day" >
      <div className="under-day__inner">
        <div className="under-day__color-con">
          <div className="under-day__color" style={{borderColor:color}}></div>
        </div>
        <span className="under-day__text">
          <span className="under-day__text__time">오전 9시</span>
          <span className="under-day__text__subject">토이 42번</span>
        </span>
      </div>
    </div>
  );
}