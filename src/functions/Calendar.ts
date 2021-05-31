import React, { useEffect } from 'react'

import {DateTime, Interval} from 'luxon';


export function useOutSideClick(               // 컴포넌트 바깥 클릭시 콜백함수 호출 하는 함수
  ref: React.MutableRefObject<any>, // generic으로 바꿀 예정
  handlerCallback: (event?: CustomEvent<MouseEvent>) => void,
): void {
  useEffect(() => {
  
    // 커스텀 이벤트 선언
    const listener = (event: CustomEvent<MouseEvent>) => {
      // reference가 없거나 
      // 클릭한 element가 reference 하위에 속한 element라면
      // 함수 종료
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }
      handlerCallback(event)
    }

    // component 가 mount 되었을때 document에 event 등록
    document.addEventListener('mousedown', listener as EventListener)
    document.addEventListener('touchstart', listener as EventListener)
    return () => {
      // component가 unmount 되었을때 document에서 event 등록 해제
      document.removeEventListener('mousedown', listener as EventListener)
      document.removeEventListener('touchstart', listener as EventListener)
    }
    // ref나 callback 함수가 변경되었을때 이벤트 새로 생성 및 등록
  }, [ref, handlerCallback])
}

const makeMonthArr = (baseDate:DateTime) => {          // 달력 렌더링 할 때 필요한 배열  
  let now = baseDate;
  let firstDayOfMonth = now.startOf("month");
  let startOfWeek = firstDayOfMonth.startOf("week");

  let month: DateTime[][] = [];
  let eachWeek: DateTime[] = [];
  let isEndOfMonth = false;

  while (!isEndOfMonth) {
    if (startOfWeek.weekday === 7) {
      // 기준 날이 일요일이면 주의 시작날은 일요일
    } else {
      startOfWeek = startOfWeek.minus({ day: 1 }); // 일요일을 제외한날의 주 의 시작요일은 월요일이라 월요일 -1
    }
    for (let i = 0; i < 7; i++) {
      // 주의 첫 날을 기준으로 요일 정보를 가진 배열을 만든다. ex) [{'일','그 날 시간정보'},{'월',17},{'화',18}...]
      let day = startOfWeek.plus({ day: i });
      eachWeek.push(day);
    }

    month.push(eachWeek);
    eachWeek=[];
    startOfWeek = startOfWeek.plus({ week: 1 });
    isEndOfMonth =
      now.endOf("month").endOf("week").toFormat("DD") ===
      startOfWeek.endOf("week").toFormat("DD");
  }
  return month
}

export const makeDayInfoArr = (base:{baseDate:string;basePeriod:string})=>{

  interface DayInfoHead {
    yoil:string;
    day:DateTime;
  }

  const yoilArr = ['월','화','수','목','금','토','일'];

  const baseDate = DateTime.fromISO(base.baseDate)
  let startOfWeek:DateTime;
  if(baseDate.weekday===7){        // 기준 날이 일요일이면 주의 시작날은 일요일
    startOfWeek = baseDate
  }else{
    startOfWeek = baseDate.startOf('week').minus({day:1})   // 일요일을 제외한날의 주 의 시작요일은 월요일이라 월요일 -1
  }

  let dayInfoArr:DayInfoHead[]=[];
  let weekInfoArr:DateTime[][]=[];

  switch(base.basePeriod){          // 일간 주간 월간에 따라서 랜더링 할때 필요한 배열 다르게
    case 'day':
        dayInfoArr = [{yoil:yoilArr[baseDate.weekday-1], day:baseDate}]
        break

    case 'week':
        for(let i = 0 ; i<7 ; i++){                // 주의 첫 날을 기준으로 요일 정보를 가진 배열을 만든다. ex) [{'일','그 날 시간정보'},{'월',17},{'화',18}...]
            let weekinfo = startOfWeek.plus({day:i})       
            dayInfoArr.push({yoil:yoilArr[weekinfo.weekday-1], day: weekinfo})
        }
        break

    case 'month':
        dayInfoArr= [];
        weekInfoArr = makeMonthArr(baseDate)
        break
  }
  
  if(dayInfoArr.length>0){
    return dayInfoArr
  }
  else{
    return weekInfoArr
  }
}


