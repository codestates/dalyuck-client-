import Nav from '../components/nav/Nav';
import MainBody from '../components/MainBody';
import { SelectorPeriod } from '../components/nav/SelectorPeriod';
import { RootState } from '../reducers/index'
import { useSelector } from 'react-redux';

const Main = ()=>{

    const {selector} = useSelector((state:RootState) => state.dateReducer);
    let isOn = selector.isOn;
    
    return(
        <div className = "main" style={{height:100+'%'}}>
            <Nav/>    
            <MainBody/>      
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
