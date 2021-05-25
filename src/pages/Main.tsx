import MainCalendarDayWeek from "../components/dayWeek/MainCalendarDayWeek";
import Nav from '../components/nav/Nav';
import { SelectorPeriod } from '../components/nav/SelectorPeriod';
import { useSelector } from 'react-redux'
import { RootState } from '../reducers/index';
import MaincalendarMonth  from "../components/month/MainCalendarMonth";
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
