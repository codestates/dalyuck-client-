import { useState } from "react";
import "./_ToDo.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  return (
    <div className="todo show">
      <div className="todo__wrapper">
        <div className="todo__header">
          <button className="todo__close__btn">&times;</button>
        </div>
        <div className="todo__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,4V7H10.5V19H13.5V7H19V4H5Z" />
          </svg>
          <input placeholder="제목 추가" className="title__input" />
        </div>
        <div className="todo__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
            />
          </svg>
          <div>
            <DatePicker
              className="todo__date__start"
              dateFormat="yyyy-MM-dd h:mm aa"
              // showTimeInput
              timeIntervals={15}
              showTimeSelect
              selected={startDate}
              onChange={(date: any) => date && setStartDate(date)}
            />
          </div>
        </div>

        <div className="todo__textarea__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3,9H17V7H3V9M3,13H17V11H3V13M3,17H17V15H3V17M19,17H21V15H19V17M19,7V9H21V7H19M19,13H21V11H19V13Z"
            />
          </svg>
          <textarea
            className="todo__discription"
            placeholder="설명 추가"
          ></textarea>
        </div>
        <div className="todo__form">
          <svg width="24px" height="24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
            />
          </svg>
          <select>
            <option value="">내 할 일 목록</option>
          </select>
        </div>
        <button className="todo__submit__btn">저장</button>
      </div>
    </div>
  );
}