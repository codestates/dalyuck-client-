import { useDispatch } from "react-redux";
import { isOptionClick } from "../../actions/index";
import { useRef } from "react"; // 레퍼런스 훅
import Swal from "sweetalert2";
import { deleteCalendar,deleteOtherCalendar } from '../../functions/Axios'


const CheckBox = ({ calendar }: { calendar: any }) => {
  return (
    <div className="check-box">
      <div
        className="check-box__inner"
        style={{ borderColor: calendar.colour }}
      >
        <div className="check-box__padding"></div>
        <div className="check-box__mid"></div>
        {/* <div className="isChecked" /> */}
        <div className="check-box__bot">
          <div className="check-box-shape">
            <div className="check-box-shape__1"></div>
            <div className="check-box-shape__2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Remove = (calendarId:number, myOrOther:string) => {
  Swal.fire({
    title: "삭제 하시겠습니까?",
    showCancelButton: true,
    confirmButtonColor: "#5f6063",
    cancelButtonColor: "#5f6063",
    confirmButtonText: "삭제",
    cancelButtonText: "취소",
    position: "center-left",
    width: "200px",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "삭제 완료.",
        confirmButtonColor: "#5f6063",
        position: "center-left",
        width: "200px",
      });
      console.log(calendarId)
      if(myOrOther === "my"){
        deleteCalendar(calendarId);
      }else{
        deleteOtherCalendar(calendarId);
      }

    }
  });
};

const Delete = ({ calendarId, myOrOther }:{ calendarId:number, myOrOther:string }) => {

  return (
    <div
      className="icon"
      onClick={() => {
        Remove(calendarId,myOrOther);
      }}
    >
      <svg className="icon-svg" viewBox="-3 -3 30 30">
        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    </div>
  );
};
const Option = ({ calendar,myOrOther }: { calendar: any ,myOrOther:string}) => {
  const componentRef = useRef<HTMLDivElement>(null); //  ref타입 설정
  const dispatch = useDispatch();

  const optionClickHandler = () => {
    let yAxis = 0;
    if (componentRef.current?.getBoundingClientRect().y)
      yAxis = componentRef.current?.getBoundingClientRect().y;
    dispatch(isOptionClick(true, calendar.id, yAxis,myOrOther));
  };

  return (
    <div
      className="icon"
      ref={componentRef}
      onClick={() => {
        optionClickHandler();
      }}
    >
      <svg className="icon-svg" viewBox="-3 -3 30 30">
        <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
      </svg>
    </div>
  );
};

function OptionDelete({ calendar, myOrOther }: { calendar: any , myOrOther:string}) {
  return (
    <div className="option-delete">
      <div className="option-delete__inner">
        <Delete calendarId={calendar.id} myOrOther={myOrOther}/>
        <Option calendar={calendar} myOrOther={myOrOther}/>
      </div>
    </div>
  );
}
export default function CalendarsList({ isOpen, calendar, myOrOther}: { isOpen: boolean; calendar: any; myOrOther:string}){

  return (
    <div className="calendars-list">
      <div
        className="calendars-list__inner"
        style={isOpen ? { height: 32 + "px" } : { height: 0 + "px" }}
      >
        <div className="calendar-label">
          <div className="calendar-label__li">
            <div className="calendar-label__li-inner">
              <div className="check-box-con">
                <CheckBox calendar={calendar} />
              </div>
              <div className="calendar-label-name">
                <span className="calendar-label-name__span">
                  {calendar.calendarName}
                </span>
              </div>
              <OptionDelete calendar={calendar} myOrOther={myOrOther} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
