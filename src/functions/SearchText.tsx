// TS Code
import axios from "axios";
import * as https from 'https';
import React, { useState } from 'react'
import SearchTextList from "./SearchTextList";

// axios.defaults.withCredentials = true;
function SearchText() : JSX.Element {
// state 저장(email)
const [state, setForm] = useState({
    searchText : "",
    result : []
});

const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    // Form제출시 초기화 방지
    e.preventDefault()

    if(!state.searchText){
        alert("Please Enter the Text");
        return;
    }

    console.log("Output searchText : ", state.searchText);

    console.log("axios button working")
    // post주소는 dalyck주소로 변경해야함
    axios.post(`http://localhost:5000/calendar/search`,{
            "userId" : 0,
            "keyword" : state.searchText
        }, {
            headers:{
                authorization: `Bearer testToken`
            }
        })
        .then(data => {
            console.log(data);
            
            setForm({
                ...state,
                result : data.data
            })

            


        })
        .catch(err => console.log(err));

    return;
}

    return (
        <>{/* 검색 및 검색결과 출력. CSS작업 필요 */}
            <form onSubmit = {handleSubmit} className = 'RequestSearchCalendar'>
                <div className = 'formControl'>
                    <input type='text' placeholder = '검색문자열 추가' 
                    onChange={(e)=> setForm({...state, searchText : e.target.value})}/>
                </div>
                <input type='submit' value = 'Save Task'/>
            </form>

            <div>
                <SearchTextList props = {state.result}/>
            </div>
        </>
        
    )
}




export default SearchText
