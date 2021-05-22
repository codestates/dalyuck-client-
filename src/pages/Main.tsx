import MainCalenderDayWeek from "../components/MainCalendarDayWeek";
import Nav from '../components/Nav';
import { SelectorPeriod } from '../components/SelectorPeriod';
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/index';

const Main = ()=>{

    const {selector} = useSelector((state:RootState) => state.dateReducer);

    let isOn = selector.isOn;

    return(
        <div className = "main" style={{height:100+'%'}}>
            <Nav/>
            <MainCalenderDayWeek/>
            {
                isOn?  (
                <SelectorPeriod/>
                ):(
                    null
                )
            }
          
        </div>
    )
};

export default Main;
