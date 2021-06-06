// CreateCalendar.tsx : /src/pages/
// branch119
import { withRouter } from "react-router-dom";
import React, { useState,useEffect } from "react";
import "../style/_CreateCalendar.scss";
import { createCalendar } from "../functions/Axios";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
// 새 캘린더 만들기 프레임 추가  #119
// Server쪽에 보낼 캘린더 이름과 설명을 입력할 Input 컨트롤 코딩.

const colorArray = [
  ["#AD1457", "rgb(244, 81, 30)", "#E4C441", "#0B8043", "#3F51B5", "#8E24AA"],
  ["#D81B60", "#EF6C00", "#C0CA33", "#009688", "#7986CB", "#795548"],
  ["#E6B3B3", "#6680B3", "#66991A", "#FF99E6", "#CCFF1A", "#FF1A66"],
  ["#D50000", "#F09300", "#7CB342", "rgb(3, 155, 229)", "#B39DDB", "#616161"]
];
let i = Math.floor(Math.random()*3);
let j = Math.floor(Math.random()*6);
let color = colorArray[i][j];


function CreateCalendar() {
  const history = useHistory();
  const { user } = useSelector((state:RootState)=>state.userReducer);
  // state로 저장 (name, explain)
  const [state, setForm] = useState({
    name: "",
    explain: "",
  });

  useEffect(()=>{
    i = Math.floor(Math.random()*3);
    j = Math.floor(Math.random()*6);
    color = colorArray[i][j];
  },[user])
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
        <input className="submit-btn" type="submit" value="캘린더 만들기" onClick={()=>{createCalendar(state.name,color);history.push("/")}} />
      </div>
    </form>
  );
}

export default withRouter(CreateCalendar);
