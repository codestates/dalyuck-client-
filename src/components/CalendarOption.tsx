import { useSelector, useDispatch} from 'react-redux'
import { RootState } from '../reducers/index'
import { useOutSideClick } from '../functions/Calendar';
import { useRef } from 'react'
import { isOptionClick } from '../actions';
import { useHistory } from "react-router-dom";
import { updateCalendar, updateOtherCalendar, updateTodoList } from '../functions/Axios';

const colorArray = [
    ["#AD1457", "rgb(244, 81, 30)", "#E4C441", "#0B8043", "#3F51B5", "#8E24AA"],
    ["#D81B60", "#EF6C00", "#C0CA33", "#009688", "#7986CB", "#795548"],
    ["#E6B3B3", "#6680B3", "#66991A", "#FF99E6", "#CCFF1A", "#FF1A66"],
    ["#D50000", "#F09300", "#7CB342", "rgb(3, 155, 229)", "#B39DDB", "#616161"]
];

const OptionColorCon = ({ color }: { color: string }) => {
    const dispatch = useDispatch();
    const { colorOption } = useSelector((state:RootState)=>state.userReducer);
    const updateHandler = () =>{
        if(colorOption.myOrOther==='my'){
            updateCalendar(colorOption.calendarId,undefined,undefined,color)    
        }else if(colorOption.myOrOther === 'other'){
            updateOtherCalendar(colorOption.calendarId,undefined,color)
        }else{
            updateTodoList(colorOption.calendarId, undefined, color)
        }
   
        dispatch(isOptionClick(false,0,0,''))
    }
    return (
        <div className="option-colors__inner">
            <div className="option-color-con" style={{ backgroundColor: color }} onClick={()=>{updateHandler()}} />
        </div>
    );
};

const CalendarOptionColor = () => {
    return (
    <div className="calendar-option-color">
        <div className="calendar-option-color__inner">
        {colorArray.map((colors,i) => {
            return (
            <div key={i} className="option-colors">
                {colors.map((color, i) => {
                return <OptionColorCon key={i} color={color} />
                })}
            </div>
            );
        })}
        </div>
    </div>
    );
};

export default function CalendarOption() {
    let history = useHistory();
    const dispatch = useDispatch();
    const {colorOption} = useSelector((state:RootState) => state.userReducer);
    const callback = ()=>{dispatch(isOptionClick(false,0,0,''))}
    const selectRef = useRef(null)

    useOutSideClick(selectRef, callback) // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

    let yAxis = colorOption.yAxis - 66;
    if(yAxis > 522)  yAxis=521;

    return (
    <div className="calendar-option" style={{top:yAxis+"px"}} ref={selectRef} >
        {" "}
        {/* 인라인 스타일로 위치 지정 */}
        <div className="calendar-option__inner">
        <span className="calendar-option__inner-2" onClick={()=>{dispatch(isOptionClick(false,colorOption.calendarId,0,''))}}>
            <div className="calendar-option-name">
                <div className="calendar-option-name__inner">
                    <div className="calendar-option-name__span" onClick={()=>{history.push("/setting/updatecalendar");}}>
                        캘린더 이름 수정
                    </div>
                </div>
            </div>
        </span>
        <CalendarOptionColor />
        </div>
    </div>
    );
}