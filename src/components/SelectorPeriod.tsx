import * as CSS from 'csstype';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectPeriod } from '../actions/index'
import { RootState } from '../reducers/index';
import { useOutSideClick } from '../functions/Calendar';

export const SelectorPeriod = () =>{
    const selectRef = useRef(null);
    const dispatch = useDispatch();
    const callback = ()=>{dispatch(selectPeriod(false, 900))}

    useOutSideClick(selectRef, callback)

    const {selector} = useSelector((state:RootState) => state.dateReducer);

    let left = selector.leftPosition 

    const position: CSS.Properties={   
        position: 'absolute',
        maxWidth: '157px',
        maxHeight: '319px',
        left: left.toString()+'px',
        top: '51px'
    };

    return(
    <div className="selector" style={position} ref={selectRef}>
        <div className="selector__inner">
        <div className="selector-period">
            <span className="selector-period__span">
            <div className="select-list">
                <div className="select-list__left">일</div>
                <div className="select-list__right-div">
                <span className="select-slist__right">D</span>
                </div>
            </div>
            </span>
            <span className="selector-period__span">
            <div className="select-list">
                <div className="select-list__left">주</div>
                <div className="select-list__right-div">
                <span className="select-slist__right">W</span>
                </div>
            </div>
            </span>
            <span className="selector-period__span">
            <div className="select-list">
                <div className="select-list__left">월</div>
                <div className="select-list__right-div">
                <span className="select-slist__right">M</span>
                </div>
            </div>
            </span>
        </div>
        </div>
    </div>
    )
}