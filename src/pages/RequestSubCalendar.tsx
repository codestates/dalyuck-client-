// RequestSubCalendar.tsx : /src/pages/
// branch121
import { withRouter } from "react-router-dom";
import React, { useState } from 'react'

// 다른사람 캘린더를 본인 캘린더에 추가 #120
// Server쪽에 보낼 캘린더 소유자의 email 입력할 Input 컨트롤 코딩.

function RequestSubCalendarCalendar() {
    // state 저장(email)
    const [state, setForm] = useState({
        email : ""
    });

    // 리덕스 상태가 들어와야함.

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        // Form제출시 초기화 방지
        e.preventDefault()

        if(!state.email){
            alert("Please Enter the Text");
            return;
        }

        console.log("Output email : ", state.email);

        // 아래는 axios가 들어가야함.

        return;
    }


    return (
            <form onSubmit = {handleSubmit} className = 'RequestSubCalendarCalendar'>
                <label>캘린더 추가</label>
                <div className = 'formControl'>
                    <input type='text' placeholder = '캘린더 추가' 
                     onChange={(e)=> setForm({...state, email : e.target.value})}/>
                </div>
                <input type='submit' value = 'Save Task'/>
            </form>
    )
}

export default withRouter(RequestSubCalendarCalendar)
