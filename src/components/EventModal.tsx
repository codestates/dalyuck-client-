import { useState } from "react";
import "./EventModal.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [EndDate, setEndDate] = useState<Date | null>(new Date());
  return (
    <div className="event show">
      <div className="event__wrapper">
        <div className="event__header">
          <button className="event__close__btn">&times;</button>
        </div>
        <div className="event__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,4V7H10.5V19H13.5V7H19V4H5Z" />
          </svg>
          <input placeholder="제목 추가" className="title__input" />
        </div>
        <div className="event__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
            />
          </svg>
          <div>
            <DatePicker
              className="event__date__start"
              dateFormat="yyyy-MM-dd h:mm aa"
              // showTimeInput
              timeIntervals={15}
              showTimeSelect
              selected={startDate}
              onChange={(date: any) => date && setStartDate(date)}
            />
          </div>
          <div>
            <DatePicker
              className="event__date__end"
              // showTimeInput
              timeIntervals={15}
              showTimeSelect
              dateFormat="yyyy-MM-dd h:mm aa"
              selected={EndDate}
              onChange={(date: any) => date && setEndDate(date)}
            />
          </div>
        </div>
        <div className="event__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M5 6C3.9 6 3 6.9 3 8S3.9 10 5 10 7 9.11 7 8 6.11 6 5 6M12 4C10.9 4 10 4.89 10 6S10.9 8 12 8 14 7.11 14 6 13.11 4 12 4M19 2C17.9 2 17 2.9 17 4S17.9 6 19 6 21 5.11 21 4 20.11 2 19 2M3.5 11C2.67 11 2 11.67 2 12.5V17H3V22H7V17H8V12.5C8 11.67 7.33 11 6.5 11H3.5M10.5 9C9.67 9 9 9.67 9 10.5V15H10V20H14V15H15V10.5C15 9.67 14.33 9 13.5 9H10.5M17.5 7C16.67 7 16 7.67 16 8.5V13H17V18H21V13H22V8.5C22 7.67 21.33 7 20.5 7H17.5Z"
            />
          </svg>
          <div>
            <input placeholder="참석자 추가" className="attendants__input" />
          </div>
        </div>
        <div className="event__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"
            />
          </svg>
          <input placeholder="위치 추가" className="attendants__input" />
        </div>
        <div className="event__textarea__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3,9H17V7H3V9M3,13H17V11H3V13M3,17H17V15H3V17M19,17H21V15H19V17M19,7V9H21V7H19M19,13H21V11H19V13Z"
            />
          </svg>
          <textarea
            className="event__discription"
            placeholder="설명 추가"
          ></textarea>
        </div>
        <div className="event__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z"
            />
          </svg>
          <select>
            <option value="">5분전</option>
            <option value="">10분전</option>
            <option value="">15분전</option>
            <option value="">30분전</option>
            <option value="">1시간 전</option>
            <option value="">1일 전</option>
          </select>
        </div>
        <button className="event__submit__btn">저장</button>
      </div>
    </div>
  );
}
