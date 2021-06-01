// UpdateCalendar.tsx : /src/pages/
// branch120
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "../style/_UpdateCalendar.scss";
import { updateCalendar } from '../functions/Axios';
import { useSelector } from 'react-redux';
import { RootState } from "../reducers/index";
import { useHistory } from 'react-router-dom';
// 내 캘린더 이름과 설명을 수정하는 프레임 추가 #120
// 기존의 캘린더의 설정(이름, 설명)을 변경하는 프레임 추가
// Server쪽에 보낼 캘린더 이름과 설명을 입력할 Input 컨트롤 코딩.

function UpdateCalendar() {
  const history = useHistory();
  const { colorOption } = useSelector((state:RootState)=>state.userReducer);

  // state로 저장 (name, explain)
  const [state, setForm] = useState({
    name: "",
    explain: "",
  });

  // 리덕스 상태가 들어와야함.

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form제출시 초기화 방지
    e.preventDefault();

    if (!state.name) {
      alert("Please Enter the Text");
      return;
    }

    console.log("Output name : ", state.name);
    console.log("Output explain : ", state.explain);

    // 아래는 axios가 들어가야함.
    updateCalendar(colorOption.calendarId,state.name);
    history.push('/');
    return;
  };

  return (
    <form onSubmit={handleSubmit} className="update-calendar-form">
      <h2 className="update-calendar-h2">캘린더 설정</h2>
      <div className="update-name">
        <input
          className="update-name-input"
          type="text"
          placeholder="이름"
          onChange={(e) => setForm({ ...state, name: e.target.value })}
        />
        <textarea
          className="update-name-textarea"
          placeholder="Enter About your description"
          onChange={(e) => setForm({ ...state, explain: e.target.value })}
        />
        <input className="submit-btn" type="submit" value="Save Task" />
      </div>
    </form>
  );
}

export default withRouter(UpdateCalendar);
