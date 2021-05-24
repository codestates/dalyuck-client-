import MainCalendarDayWeek from "../components/MainCalendarDayWeek";
import Nav from '../components/Nav';
import { SelectorPeriod } from '../components/SelectorPeriod';
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/index';
import MaincalendarMonth  from "../components/MainCalendarMonth";
const Main = ()=>{

    const {selector,base} = useSelector((state:RootState) => state.dateReducer);
    
    let isOn = selector.isOn;

    return(
        <div className = "main" style={{height:100+'%'}}>
            <Nav/>
            {
                base.basePeriod==='month' ? (
                    <MaincalendarMonth/>
                ):(
                    <MainCalendarDayWeek/>
                )
            }
            
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
