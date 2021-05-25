import "../style/_ToDo.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export const ToDo = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div>
      <div className="todo__outsider"></div>
      <div className="todo__wrapper">
        <button className="todo__close-btn">&times;</button>
        <div className="todo__form">
          <input className="todo__form__title" placeholder="제목 추가"></input>
          <div className="todo__border-bottom"></div>

          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={startDate}
            onChange={(date: any) => date && setStartDate(date)}
          />

          <textarea placeholder="설명 추가"></textarea>
          <select>
            <option value="">내 할 일 목록</option>
          </select>
          <button className="todo__form__submit-btn">저장</button>
        </div>
      </div>
    </div>
  );
};
