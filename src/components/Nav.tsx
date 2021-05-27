import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/index";
import { setBaseDate, selectPeriod, signOut } from "../actions/index";
import { DateTime } from "luxon";
import { useRef, useState } from "react"; // 레퍼런스 훅스

import { useHistory, useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import Modal from "./Modal";

const axios: any = require("axios");
axios.defaults.withCredentials = true;

interface NavbarProps {
  currentPage?: string;
}

const Nav = (props: NavbarProps) => {
  const { currentPage } = props;
  const history = useHistory();
  const state = useSelector((state: RootState) => state);
  const {
    userReducer: { data, token },
  } = state;

  const [SignInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalComment, setModalComment] = useState<string>("");

  const componentRef = useRef<HTMLDivElement>(null); //  ref타입 설정
  const { base } = useSelector((state: RootState) => state.dateReducer);
  const dispatch = useDispatch();

  let date = base.baseDate;
  let period: {};
  let periodKor: string = "주";
  let navText: string = DateTime.fromISO(date).toFormat("y년 M월");
  switch (base.basePeriod) {
    case "day":
      period = { day: 1 };
      periodKor = "일";
      navText = DateTime.fromISO(date).toFormat("y년 M월 d일");
      break;
    case "week":
      period = { week: 1 };
      periodKor = "주";
      navText = DateTime.fromISO(date).toFormat("y년 M월");
      break;
    case "month":
      period = { month: 1 };
      periodKor = "월";
      navText = DateTime.fromISO(date).toFormat("y년 M월");
      break;
  }

  const closeSignInModal = () => {
    setSignInModalOpen(false);
  };

  const handleSignInBtn = () => {
    setSignInModalOpen(true);
  };

  const handleGoogleSign = (state: string): void => {
    alert("개발중");
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSignOutBtn = () => {
    axios
      .post(
        `https://ec2-34-207-81-162.compute-1.amazonaws.com:3000/user/logout/`,
        {
          userId: data.userId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            credentials: "include",
          },
        }
      )
      .then((res: any) => {
        dispatch(signOut());
        setModalComment("로그아웃 완료.");
        handleModalOpen();
      })
      .catch((err: any) => console.error(err));
  };

  const todayHandler = () => {
    const baseDate: string = DateTime.now().toISO();
    dispatch(setBaseDate(baseDate));
  };
  const prevHandler = () => {
    const baseDate: string = DateTime.fromISO(date).minus(period).toISO();
    dispatch(setBaseDate(baseDate));
  };
  const nextHandler = () => {
    const baseDate: string = DateTime.fromISO(date).plus(period).toISO();
    dispatch(setBaseDate(baseDate));
  };
  return (
    <div className="nav">
      <Modal
        modalType="alertModal"
        open={openModal}
        close={handleModalClose}
        comment={modalComment}
      />
      <SignIn
        open={SignInModalOpen}
        close={closeSignInModal}
        handleGoogleSign={handleGoogleSign}
      />
      <div className="nav-con">
        <div className="menu-logo-name-con">
          <div className="menu-con">
            {/* sidebar 접었다 폇다하는 버튼 */}
            <svg focusable="false" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </svg>
          </div>
          <div className="logo-name-con">
            {/* 로고 사진, 프로젝트명 기입 */}
            <span className="project-name">달력</span>
          </div>
        </div>
        <div className="today-direction-search-period-con">
          <div className="today-direction-con">
            <div className="navigator-con">
              {/* 위치 버튼 3개 */}
              <div className="navigator">
                <div className="today-btn">
                  <span
                    className="today-btn-span"
                    onClick={() => {
                      todayHandler();
                    }}
                  >
                    오늘
                  </span>
                </div>
                <div
                  className="previous-btn"
                  onClick={() => {
                    prevHandler();
                  }}
                >
                  <div className="pre-next-btn-con">
                    <svg focusable="false" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                      />
                    </svg>
                  </div>
                </div>
                <div
                  className="next-btn"
                  onClick={() => {
                    nextHandler();
                  }}
                >
                  <div className="pre-next-btn-con">
                    <svg focusable="false" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-string-con">
              {/* 현재 탐색한 날짜 문자열 표시 */}
              <div className="nav-string">
                <div className="years-month-string">{navText}</div>
              </div>
            </div>
          </div>
          <div className="search-period-con">
            <div className="search-period-con-1">
              <div className="search-btn">
                {/* 검색버튼 */}
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  style={{ height: 25 }}
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </div>
              <div className="period-select">
                <div
                  className="period-select-con"
                  ref={componentRef}
                  onClick={() => {
                    let x = componentRef.current?.getBoundingClientRect().x;
                    console.log("click");
                    dispatch(selectPeriod(true, x));
                  }}
                >
                  {/* 일간 주간 월간 선택 */}
                  <span className="period-string">{periodKor}</span>
                  {/* <div className="period-select-btn"> */}
                  <svg focusable="false" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M7,10L12,15L17,10H7Z" />
                  </svg>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="navbar__btns__first"
          onClick={token.length === 0 ? handleSignInBtn : handleSignOutBtn}
        >
          {token.length === 0 ? "로그인" : "로그아웃"}
        </button>
      </div>
    </div>
  );
};

export default Nav;
