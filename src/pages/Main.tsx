
import Nav from '../components/nav/Nav';
import MainBody from '../components/MainBody';
import { SelectorPeriod } from '../components/nav/SelectorPeriod';
import { RootState } from '../reducers/index'
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Profile } from "../components/nav/Profile";



const Main = () => {
  const { selector } = useSelector((state: RootState) => state.userReducer);
  let isOn = selector.isOn;
  const { profile } = useSelector((state: RootState) => state.userReducer);
  let IsOnProFile = profile.isOn;

  return (
    <div className="main" style={{ height: 100 + "%" }}>
      <Nav />
      <MainBody />
      {isOn ? <SelectorPeriod /> : null}
      {IsOnProFile ? <Profile /> : null}
    </div>
  );
};

export default withRouter(Main);
