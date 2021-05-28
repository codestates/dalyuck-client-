import { useSelector, useDispatch} from 'react-redux'
import { RootState } from '../reducers/index'
import { useOutSideClick } from '../functions/Calendar';
import { useRef } from 'react'
import { isOptionClick } from '../actions';
import { useHistory } from "react-router-dom";

const colorArray = [
    ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333"],
    ["#3366E6", "#999966", "#99FF99", "#B34D4D", "#80B300", "#809900"],
    ["#E6B3B3", "#6680B3", "#66991A", "#FF99E6", "#CCFF1A", "#FF1A66"],
    ["#E6331A", "#33FFCC", "#66994D", "#B366CC", "#4D8000", "#B33300"]
];

const OptionColorCon = ({ color }: { color: string }) => {
    return (
    <div className="option-color-con" style={{ backgroundColor: color }} />
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
                return <OptionColorCon key={i} color={color} />;
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
    const {colorOption} = useSelector((state:RootState) => state.dateReducer);
    const callback = ()=>{dispatch(isOptionClick(false,0,0))}
    const selectRef = useRef(null)
    useOutSideClick(selectRef, callback) // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

    let yAxis = colorOption.yAxis - 66
    return (
    <div className="calendar-option" style={{top:yAxis+"px"}} ref={selectRef}>
        {" "}
        {/* 인라인 스타일로 위치 지정 */}
        <div className="calendar-option__inner">
        <span className="calendar-option__inner-2">
            <div className="calendar-option-name">
                <div className="calendar-option-name__inner">
                    <div className="calendar-option-name__span" onClick={()=>{history.push("/setting/updatecalendar"); console.log('click')}}>
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