import * as CSS from 'csstype';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectPeriod, setBasePeriod } from '../../actions/index'
import { RootState } from '../../reducers/index';
import { useOutSideClick } from '../../functions/Calendar';

type Select={
    kor:string;
    eng:string;
    clickSelect:React.MouseEventHandler<HTMLDivElement> 
}

const SelectorPeriodSpanCon = ({kor,eng,clickSelect}:Select)=>{

    return(
        <span className="selector-period__span" onClick={clickSelect}>
            <div className="select-list">
                <div className="select-list__left" >{kor}</div>
                <div className="select-list__right-div">
                    <span className="select-slist__right">{eng}</span>
                </div>
            </div>
        </span>
    )
}

export const SelectorPeriod = () =>{
    const selectRef = useRef(null);
    const dispatch = useDispatch();
    const callback = ()=>{dispatch(selectPeriod(false, 900))}

    useOutSideClick(selectRef, callback) // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

    const {selector} = useSelector((state:RootState) => state.userReducer);

    let left = selector.leftPosition 

    const position: CSS.Properties={   
        position: 'absolute',
        maxWidth: '157px',
        maxHeight: '319px',
        left: left.toString()+'px',
        top: '51px'
    };

    const clickSelect:React.MouseEventHandler<HTMLDivElement> = (e)=>{
        console.log(e.target);
        console.log(e.currentTarget);
        let periodText = e.currentTarget.textContent;
        if(periodText) dispatch(setBasePeriod(periodText));
        
        switch (periodText){
            case '일D':
                dispatch(setBasePeriod('day'))
            break
            case '주W':
                dispatch(setBasePeriod('week'))
            break
            case '월M':
                dispatch(setBasePeriod('month'))
            break
        }
        dispatch(selectPeriod(false, 900))
    }

    return(
    <div className="selector" style={position} ref={selectRef}>
        <div className="selector__inner">
        <div className="selector-period">
            <SelectorPeriodSpanCon kor='일' eng='D' clickSelect={clickSelect}/>
            <SelectorPeriodSpanCon kor='주' eng='W' clickSelect={clickSelect}/>
            <SelectorPeriodSpanCon kor='월' eng='M' clickSelect={clickSelect}/>
        </div>
        </div>
    </div>
    )
}