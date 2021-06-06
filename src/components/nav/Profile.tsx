import * as CSS from "csstype";
import "../../style/_Profile.scss";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProfile, signOut } from "../../actions/index";
import { RootState } from "../../reducers/index";
import { useOutSideClick } from "../../functions/Calendar";
import Swal from "sweetalert2";
import dotenv from "dotenv";
dotenv.config();
const axios: any = require("axios");
axios.defaults.withCredentials = true;

export const Profile = () => {
  const selectRef = useRef(null);
  const dispatch = useDispatch();
  const callback = () => {
    dispatch(selectProfile(false, 900));
  };
  useOutSideClick(selectRef, callback); // 해당 컴포넌트의 바깥 지역을 클릭 하면 callback 함수가 실행됨.

  const state = useSelector((state: RootState) => state);
  const {
    userReducer: { user, token, password, profile },
  } = state;

  let left = profile.leftPosition - 78;

  const position: CSS.Properties = {
    position: "absolute",
    maxWidth: "157px",
    maxHeight: "319px",
    left: left.toString() + "px",
    top: "51px",
  };

  const handleSignOutBtn = () => {
    axios
      .post(
        process.env.REACT_APP_API_URL + `/user/logout/`,
        {
          userId: user.id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: any) => {
        dispatch(signOut());
        dispatch(selectProfile(false, 900));
      })
      .catch((err: any) => console.error(err));
  };

  const deleteMyAccount = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + `/user/info`, {
        data: {
          userId: user.id,
          password: password,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res: any) => {
        console.log(res);
        dispatch(signOut());
        // dispatch(selectProfile(false, 900));
      })
      .catch((err: any) => console.error(err));
  };

  const handleDeleteBtn = () => {
    Swal.fire({
      title: "탈퇴 하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#5f6063",
      cancelButtonColor: "#5f6063",
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
      position: "top-right",
      width: "200px",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "탈퇴 완료.",
          confirmButtonColor: "#5f6063",
          position: "top-right",
          width: "200px",
        });
        deleteMyAccount();
      }
    });
  };

  return (
    <div className="profile__info__form" style={position} ref={selectRef}>
      <span>{user.userName}</span>
      <span>{user.email}</span>
      <div className="logout__form">
        <button
          onClick={() => {
            handleSignOutBtn();
          }}
        >
          로그아웃
        </button>
      </div>
      {user.email === process.env.REACT_APP_MAIL_USER ? (
        <div className="delete__form">
          <button
            style={{ backgroundColor: "#9b9b9c" }}
            disabled
            onClick={() => {
              handleDeleteBtn();
            }}
          >
            회원탈퇴
          </button>
        </div>
      ) : (
        <div className="delete__form">
          <button
            onClick={() => {
              handleDeleteBtn();
            }}
          >
            회원탈퇴
          </button>
        </div>
      )}
    </div>
  );
};
