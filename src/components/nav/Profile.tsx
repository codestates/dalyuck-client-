import * as CSS from "csstype";
import "../../style/_Profile.scss";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProfile, signOut } from "../../actions/index";
import { RootState } from "../../reducers/index";
import { useOutSideClick } from "../../functions/Calendar";
import { useHistory } from "react-router-dom";

const axios: any = require("axios");
axios.defaults.withCredentials = true;

export const Profile = () => {
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const callback = () => {
    dispatch(selectProfile(false, 900));
  };
  useOutSideClick(selectRef, callback); // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

  const history = useHistory();

  const state = useSelector((state: RootState) => state);
  const {
    userReducer: { data, token },
  } = state;

  const { profile } = useSelector((state: RootState) => state.userReducer);

  let left = profile.leftPosition - 78;

  const position: CSS.Properties = {
    position: "absolute",
    maxWidth: "157px",
    maxHeight: "319px",
    left: left.toString() + "px",
    top: "51px",
  };

  const handleSignOutBtn = () => {
    console.log(process.env.REACT_APP_API_URL);
    axios
      .post(
        process.env.REACT_APP_API_URL + `/user/logout/`,
        {
          userId: data.userId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            // 에러부분 시작.
            // "Content-Type": "application/json", // Content-Type CORS위배
            // credentials: "include", // 위쪽에 이미 credentials선언 true
            // 에러부분 끝.
          },
        }
      )
      .then((res: any) => {
        dispatch(signOut());
        dispatch(selectProfile(false, 900));
      })
      .catch((err: any) => console.error(err));
  };

  return (
    <div className="profile__info__form" style={position} ref={selectRef}>
      <span>{data.userName}</span>
      <span>{data.email}</span>
      <div className="logout__form">
        <button
          onClick={() => {
            handleSignOutBtn();
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
