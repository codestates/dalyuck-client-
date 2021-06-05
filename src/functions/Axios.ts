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
// 참석자 겟 요청
export const getAttendants= async()=>{  
    updateState()
    let result;

    result = await basicAxios.get(`/event/attend/${userState.user.id}`)
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
// 캘린더 겟요청
// export const getCalendar = async()=>{  
//     updateState()
//     let result;

//     result = await basicAxios.get(`/calendar/${userState.user.id}`)
//     .then(res=>{
//         return res.data
//     }).catch(error=>{
//         if(axios.isAxiosError(error)){
//             console.log('axios error')
//             console.log(error)
//         } else{
//             console.log('unExpected error')
//         }
//     })
//     return result
// }

export const getCalendar = () => {
    let result;

    result = axios.get(process.env.REACT_APP_API_URL+`/calendar/${userState.user.id}`,{
        headers:{
            authorization:`Bearer ${userState.token}`
        }
    }).then(res=>{
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

// [ 새 캘린더 만들기]
export const createCalendar = async(calendarName:string,description?:string)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.post("/calendar",{
            calendarName,
            description,
            userId:userState.user.id
        }).then(res=>{
            return getCalendar()
        }).then(res=>{
            store.dispatch(action.setCalendar(res))
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


// [ 캘린더 수정 ] 없는 전달인자는 undefined 기입 ex) updateCalendar(1,undefined,undefined,"#2134") 색만 변경 원할경우 (캘ㄹ린더 아이디는 컴포넌트에서 상태로 받아와야함 )

export const updateCalendar = async(calendarId:number,calendarName?:string,description?:string,colour?:string)=>{   

    // if(colour) store.dispatch(action.setIsColorLoading(true)) ;
    updateState()
    let result;
    try{
        result = await basicAxios.patch("/calendar",{
            calendarName,
            description,
            userId:userState.user.id,
            calendarId,
            colour
        }).then(res=>{
            // store.dispatch(action.setIsColorLoading(false))
            return getCalendar()
        }).then(res=>{
            store.dispatch(action.setCalendar(res))
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
                userId:userState.user.id
            }
        }).then(res=>{
           return getCalendar()
        }).then(res=>{
            store.dispatch(action.setCalendar(res))
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error)
        } else{
            console.log('unExpected error')
            console.log(error)
        }
    }
    return result
}

// 이벤트 겟요청
export const getEvent = async()=>{  
    updateState()
    let result;

    result = await basicAxios.get(`/event/${userState.user.id}`)
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

// [ 이벤트 참가자 요청]
export const reqEventAttend = async(eventId:string, attandent:string)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.post("/event/attend",{
            eventId,
            userId:userState.user.id,
            requesterEmail:userState.user.email,
            requesteeEmail:attandent
        }).then(res=>{
            return getAttendants();
        }).then(res=>{
            store.dispatch(action.setTodoList(res));
        })
    }catch (error){
        if(axios.isAxiosError(error)){
            console.log('axios error')
            console.log(error,'attendant')
        } else{
            console.log('unExpected error')
        }
    }
    return result
}

// [ 새 이벤트 만들기]
export const createEvent = async(startTime:string,endTime:string,calendarId:number,eventName:string,description?:string,access=true,location?:string,colour?:string,attendant?:string)=>{  
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
            userId:userState.user.id
        }).then(res=>{
            if(attendant) {
                reqEventAttend(res.data.id, attendant);
                getAttendants()
            }
            return getCalendar()
        }).then(res=>{
            store.dispatch(action.setCalendar(res))
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
            userId:userState.user.id
        }).then(res=>{
            console.log(res)
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
                userId:userState.user.id
            }
        }).then(res=>{
            return getCalendar();
        }).then(res=>{
            store.dispatch(action.setCalendar(res))
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

// 할일 겟 요청
export const getTodo= async(toDoListId:number)=>{  
    updateState()
    let result;

    result = await basicAxios.get(`/todoList?userId=${userState.user.id}`)
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
// [ 새 할일 만들기]
export const createTodo = async(startTime:string,endTime:string,toDoListId:number,toDoName:string,description?:string)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.post("/todo",{
            startTime,
            endTime,
            toDoListId, 
            toDoName,
            description,
            userId:userState.user.id
        }).then(res=>{
            return getTodo(toDoListId);
        }).then(res=>{

            store.dispatch(action.setTodoList(res));
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
            userId:userState.user.id
        }).then(res=>{
            return getTodo(toDoListId);
        }).then(res=>{
            store.dispatch(action.setTodoList(res));
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
export const deleteTodo= async(toDoId:number,toDoListId:number)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.delete("/todo",{
            data:{             // delete는 바디를 data객체 안에 넣어서 전달해야한다.
                todoId:toDoId,
                userId:userState.user.id
            }
        }).then(res=>{
            return getTodo(toDoListId);
        }).then(res=>{
            store.dispatch(action.setTodoList(res));
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

// [ 포스트 캘린더 구독  ]
export const subscribeCalendar= async(requesteeEmail:string)=>{  
    updateState()
    store.dispatch(action.setIsSubLoading(true))            // 로딩 상태 변경
    let result;
    try{
        result = await basicAxios.post("/calendar/subscribe",{
            requesterEmail:userState.user.email,
            requesteeEmail,
            userId:userState.user.id
        }).then(res=>{
            store.dispatch(action.setIsSubLoading(false))
            return getCalendar();
        }).then(res=>{
            store.dispatch(action.setCalendar(res));
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

// [ 패치 구독한 캘린더 수정  ]
export const updateOtherCalendar= async(otherCalendarId:number,calendarName?:string,color?:string)=>{

    updateState()
    let result;
    try{
        result = await basicAxios.patch("/calendar/subscribe",{
            id:userState.user.id,
            otherCalendarId,
            calendarName,
            color
        }).then(res=>{
            return getCalendar();
        }).then(res=>{
            store.dispatch(action.setCalendar(res));
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

// [ 삭제 구독한 캘린더 삭제 ]
export const deleteOtherCalendar= async(otherCalendarId:number)=>{  
    updateState()
    let result;
    try{
        result = await basicAxios.delete("/calendar/subscribe",{
            data:{             // delete는 바디를 data객체 안에 넣어서 전달해야한다.
                otherCalendarId,
                userId:userState.user.id
            }
        }).then(res=>{
            return getCalendar();
        }).then(res=>{
            store.dispatch(action.setCalendar(res));
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

export const updateTodoList = async(toDoListId:number,toDoListName?:string,colour?:string)=>{   

    updateState()
    let result;
    try{
        result = await basicAxios.patch("/todoList",{
            toDoListId:toDoListId,
            colour,
            toDoListName:"Tasks",
            userId:userState.user.id
        }).then(res=>{
            return getTodo(toDoListId);
        }).then(res=>{
            store.dispatch(action.setTodoList(res));
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