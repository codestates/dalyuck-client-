// TS Code
import React, { useState } from 'react'

// 정렬된 리스트를 받아야함

const SearchTextList = ({props} : {props : any}) => {

    // SearchText.tsx에서 props는 서버에서 받은 검색 리스트임
    console.log('props : ',props);

    return (
        <>
        <h1>{
            props.length >0 ? props.map((ele : any, idx : number) => {
                return (
                    <>  {/* map을 돌려서 리스트 나열 CSS작업 필요 */}
                        <div key = {idx}>
                            <a >Date : {ele.startTime.slice(0,8)} |</a>
                            <a >Time : {ele.startTime.slice(8)} ~ {ele.endTime.slice(8)} |</a>
                            <a >EventName : {ele.eventName}</a>     
                        </div>
                    </>
                )
            }) : 
            "No result"
        }</h1>
        </>
    )
}



export default SearchTextList

