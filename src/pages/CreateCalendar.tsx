// CreateCalendar.tsx : /src/pages/
// branch119
import { withRouter } from "react-router-dom";
import React, { useState } from "react";
import "../style/_CreateCalendar.scss";
import { createCalendar } from "../functions/Axios";
import { useHistory } from 'react-router-dom';
// 새 캘린더 만들기 프레임 추가  #119
// Server쪽에 보낼 캘린더 이름과 설명을 입력할 Input 컨트롤 코딩.

function CreateCalendar() {
  const history = useHistory();
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

    return;
  };

  return (
    <form onSubmit={handleSubmit} className="create-calendar-form">
      <h2 className="create-calendar-h2">새 캘린더 만들기</h2>
      <div className="create-name">
        <input
          className="create-name-input"
          type="text"
          placeholder="이름"
          onChange={(e) => setForm({ ...state, name: e.target.value })}
        />
        <textarea
          className="create-name-textarea"
          placeholder="설명"
          onChange={(e) => setForm({ ...state, explain: e.target.value })}
        />
        <input className="submit-btn" type="submit" value="캘린더 만들기" onClick={()=>{createCalendar(state.name);history.push("/")}} />
      </div>
    </form>
  );
}

export default withRouter(CreateCalendar);
