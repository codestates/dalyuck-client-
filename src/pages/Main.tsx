import MainCalenderDayWeek from "../components/MainCalendarDayWeek";
import Nav from '../components/Nav';

const Main = ()=>{
    return(
        <div className = "main" style={{height:100+'%'}}>
            <Nav/>
            <MainCalenderDayWeek/>
        </div>
    )
};

export default Main;
