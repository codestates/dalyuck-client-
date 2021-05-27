import { useState, useEffect, useCallback, useRef, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../actions";
import Signup from "./SignUp";
import Modal from "./Modal";
import "../style/User.scss";

const axios: any = require("axios");
axios.defaults.withCredentials = true;

type SigninProps = {
  open?: boolean;
  close: () => void;
  handleGoogleSign: (reqPage: string, state: string) => void;
  currentPage?: string;
};

const Signin = (props: SigninProps) => {
  const { open, close, handleGoogleSign, currentPage } = props;

  const dispatch = useDispatch();
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [SignUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");
  const [modalComment, setModalComment] = useState<string>("");

  useEffect(() => {
    refEmail.current?.focus();
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleCloseBtn();
    });
  }, [open]);

  const handleKeyPressEnter = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      refPassword.current?.focus();
      if (e.currentTarget.classList[1] === "inputpassword") handleSignIn();
    }
  };

  const handleChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputEmail(e.target?.value);
    },
    [inputEmail]
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputPassword(e.target?.value);
    },
    [inputPassword]
  );

  const handleCloseBtn = (): void => {
    setInputEmail("");
    setInputPassword("");
    setErrorMessage("");
    close();
  };

  const handleSignIn = () => {
    if (inputEmail === "") {
      refEmail.current?.focus();
      setErrorMessage("이메일을 입력하세요");
      return;
    }
    if (inputPassword === "") {
      refPassword.current?.focus();
      setErrorMessage("비밀번호를 입력하세요");
      return;
    }
    axios
      .post(
        `https://ec2-34-207-81-162.compute-1.amazonaws.com:3000/user/login/`,
        {
          email: inputEmail,
          password: inputPassword,
        }
      )
      .then((res: any) => {
        const token = res.headers.authorization.split(" ")[1];
        if (token) {
          dispatch(signIn(res.data, token));
          handleCloseBtn();
          setModalComment("로그인 완료.");
          handleModalOpen();
        }
      })
      .catch((err: any) => {
        console.error(err); //response.status(404)에러처리
        setErrorMessage("해당 유저가 존재하지 않습니다.");
      });
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const closeSignUpModal = () => {
    setSignUpModalOpen(false);
  };

  const handleSignupBtn = () => {
    setSignUpModalOpen(true);
    close();
  };

  return (
    <>
      <Modal
        modalType="alertModal"
        open={openModal}
        close={handleModalClose}
        comment={modalComment}
      />
      <Signup open={SignUpModalOpen} close={closeSignUpModal} />
      {open ? (
        <div className="signin show">
          <div className="signin__outsider" onClick={handleCloseBtn}></div>
          <div className="signin__wrapper">
            <button className="signin__close-btn" onClick={handleCloseBtn}>
              &times;
            </button>
            <div className="signin__form">
              <div className="signin__form__title">로그인</div>
              <ul className="signin__form__list">
                <li className="signin__form__item">
                  <p className="signin__form__item__label">E-MAIL</p>
                  <input
                    type="text"
                    className="signin__form__item__input inputemail"
                    placeholder="Email"
                    value={inputEmail}
                    required
                    onChange={handleChangeEmail}
                    onKeyPress={handleKeyPressEnter}
                    ref={refEmail}
                  />
                </li>
                <li className="signin__form__item">
                  <p className="signin__form__item__label">비밀번호</p>
                  <input
                    type="password"
                    className="signin__form__item__input inputpassword"
                    placeholder="Password"
                    value={inputPassword}
                    required
                    onChange={handleChangePassword}
                    onKeyPress={handleKeyPressEnter}
                    ref={refPassword}
                  />
                </li>
              </ul>
              <p className="signin__form__error-message">{errorMessage}</p>

              <button
                className="signin__form__submit-btn"
                onClick={handleSignIn}
                onKeyPress={handleKeyPressEnter}
              >
                로그인
              </button>
              <button
                className="signin__form__submit-btn"
                onClick={handleSignupBtn}
              >
                회원가입
              </button>
              <button
                className="signin__form__google-btn"
                onClick={() => handleGoogleSign("/", "signin")}
              >
                Google
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Signin;
