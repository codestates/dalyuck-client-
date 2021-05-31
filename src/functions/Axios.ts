import axios from 'axios';
import {store} from '../store/Store'   // 리액트 컴포넌트 밖에서 상태를 가져오기 위해 스토어를 가져옴 
import dotenv from 'dotenv';
import * as action from '../actions/index';


dotenv.config()
axios.defaults.withCredentials = true;  

let reducers = store.getState();
let userState = reducers.userReducer; 
let basicAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        authorization: `Bearer ${userState.token}`,
        // "Content-Type": "application/json",
        // credentials: "include"
    },
})

// 상태 받기 함수
const updateState = () =>{
    reducers = store.getState();

    userState = reducers.userReducer;     // 상태 사용 가능
    
    basicAxios = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            authorization: `Bearer ${userState.token}`,
            // "Content-Type": "application/json",
            // credentials: "include"
        },
    })
}

// [ 새 캘린더 만들기]

export const createCalendar = async(calendarName:string,description?:string)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.post("/calendar",{
            calendarName,
            description,
            userId:userState.data.userId
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}

// 캘린더 겟요청
export const getCalendar = async()=>{  
    updateState()
    let result;

    result = await basicAxios.get(`/calendar/${userState.data.userId}`)
    .then(res=>{
        return res.data
    }).catch(error=>{
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    })
    return result
}

// [ 캘린더 수정 ] 없는 전달인자는 undefined 기입 ex) updateCalendar(1,undefined,undefined,"#2134") 색만 변경 원할경우 (캘ㄹ린더 아이디는 컴포넌트에서 상태로 받아와야함 )

export const updateCalendar = async(calendarId:number,calendarName?:string,description?:string,colour?:string)=>{   
    updateState()
    let result;
    try{
        result = await basicAxios.patch("/calendar",{
            calendarName,
            description,
            userId:userState.data.userId,
            calendarId,
            colour
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}

// [ 캘린더 삭제 ]
export const deleteCalendar = async(calendarId:number)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.delete("/calendar",{
            data:{             // delete는 바디를 data객체 안에 넣어서 전달해야한다.
                calendarId,
                userId:userState.data.userId
            }
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}


// [ 새 이벤트 만들기]
export const createEvent = async(startTime:string,endTime:string,calendarId:number,eventName:string,description?:string,access=true,location?:string,colour?:string)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.post("/event",{
            startTime,
            endTime,
            calendarId,
            eventName,
            access,
            location,
            colour,
            description,
            userId:userState.data.userId
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}

// [ 이벤트 수정 ] 없는 전달인자는 undefined 기입 ex) updateCalendar(1,undefined,undefined,"#2134") 색만 변경 원할경우 (캘ㄹ린더 아이디는 컴포넌트에서 상태로 받아와야함 )
export const updateEvent = async(calendarId:number,eventId:number,startTime?:string,endTime?:string,eventName?:string,description?:string,access=true,location?:string,colour?:string)=>{   
    updateState()
    let result;
    console.log(userState)
    try{
        result = await basicAxios.patch("/event",{
            eventId,
            startTime,
            endTime,
            calendarId,
            eventName,
            access,
            location,
            colour,
            description,
            userId:userState.data.userId
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}

// [ 이벤트 삭제 ]
export const deleteEvent = async(eventId:number)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.delete("/event",{
            data:{             // delete는 바디를 data객체 안에 넣어서 전달해야한다.
                eventId,
                userId:userState.data.userId
            }
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}


// [ 새 할일 만들기]
export const createTodo = async(startTime:string,toDoListrId:number,toDoName:string,description?:string)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.post("/todo",{
            startTime,
            toDoListrId,
            toDoName,
            description,
            userId:userState.data.userId
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}

// [ 할일 수정 ] 없는 전달인자는 undefined 기입 ex) updateCalendar(1,undefined,undefined,"#2134") 색만 변경 원할경우 (캘ㄹ린더 아이디는 컴포넌트에서 상태로 받아와야함 )
export const updateTodo = async(toDoListId:number,startTime?:string,toDoName?:string,description?:string,isFinished=false)=>{   
    updateState()
    let result;
    console.log(userState)
    try{
        result = await basicAxios.patch("/todo",{
            startTime,
            toDoListId,
            toDoName,
            description,
            isFinished,
            userId:userState.data.userId
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}

// [ 할일 삭제 ]
export const deleteTodo= async(toDoId:number)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.delete("/todo",{
            data:{             // delete는 바디를 data객체 안에 넣어서 전달해야한다.
                toDoId,
                userId:userState.data.userId
            }
        }).then(res=>{
            console.log(res.data)
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
        }
    }
    return result
}