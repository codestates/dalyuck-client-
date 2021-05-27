// CreateCalendar.tsx : /src/pages/
// branch119

import React, { useState } from 'react'

// 새 캘린더 만들기 프레임 추가  #119
// Server쪽에 보낼 캘린더 이름과 설명을 입력할 Input 컨트롤 코딩.

function CreateCalendar() {
    // state로 저장 (name, explain)
    const [state, setForm] = useState({
        name : "",
        explain : ""
    });

    // 리덕스 상태가 들어와야함.

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        // Form제출시 초기화 방지
        e.preventDefault()

        if(!state.name || !state.explain){
            alert("Please Enter the Text");
            return;
        }

        console.log("Output name : ", state.name);
        console.log("Output explain : ", state.explain);

        // 아래는 axios가 들어가야함.

        return;
    }


    return (
            <form onSubmit = {handleSubmit} className = 'CreateCalendar'>
                <label>새 캘린더 만들기</label>
                <div className = 'formControl'>
                    <input type='text' placeholder = '이름' 
                     onChange={(e)=> setForm({...state, name : e.target.value})}/>
                </div>
                <div className = 'formControl'>
                    {/* <input type='textarea' placeholder = '설명' 
                     onChange={(e)=> setForm({...state, "explain" : e.target.value})}/> */}
                    <textarea rows={3} 
                        className='form-control' 
                        placeholder='Enter About your description'
                        onChange={(e)=> setForm({...state, explain : e.target.value})}/>
                </div>

                <input type='submit' value = 'Save Task'/>
            </form>
    )
}

export default CreateCalendar
