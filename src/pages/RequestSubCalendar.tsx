// RequestSubCalendar.tsx : /src/pages/
// branch121
import React, { useState } from 'react'

// 내 캘린더 이름과 설명을 수정하는 프레임 추가 #120
// 기존의 캘린더의 설정(이름, 설명)을 변경하는 프레임 추가
// Server쪽에 보낼 캘린더 이름과 설명을 입력할 Input 컨트롤 코딩.

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

export default RequestSubCalendarCalendar
