import React, { useCallback, useEffect, useRef, useState } from "react";
import { signIn } from "../actions";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import dotenv from "dotenv";
const axios: any = require("axios");
axios.defaults.withCredentials = true;
dotenv.config();
type SignupProps = {
  open?: boolean;
  close: () => void;
};

const Signup = (props: SignupProps) => {
  const { open, close } = props;

  const dispatch = useDispatch();
  const refEmail = useRef<HTMLInputElement | null>(null);
  const refUserName = useRef<HTMLInputElement | null>(null);
  const refPassword = useRef<HTMLInputElement | null>(null);
  const refPasswordCheck = useRef<HTMLInputElement | null>(null);

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputUserName, setInputUserName] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [inputPasswordCheck, setInputPasswordCheck] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalComment, setModalComment] = useState<string>("");

  const handleModalOpen = () => {
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    refEmail.current?.focus();
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleCloseBtn();
    });
  }, [open]);

  const handleMoveToUserName = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      refUserName.current?.focus();
    }
  };
  const handleMoveTopassword = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      refPassword.current?.focus();
    }
  };
  const handleMoveTopasswordCheck = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      refPasswordCheck.current?.focus();
    }
  };
  const handleMoveToSignUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSignUp();
    }
  };

  const handleChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputEmail(e.target?.value);
    },
    []
  );

  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputUserName(e.target?.value);
    },
    []
  );
  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputPassword(e.target?.value);
    },
    []
  );
  const handleChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputPasswordCheck(e.target?.value);
    },
    []
  );

  const handleCloseBtn = (): void => {
    setInputEmail("");
    setInputUserName("");
    setInputPassword("");
    setInputPasswordCheck("");
    setErrorMessage("");
    close();
  };

  const checkValidEmail = useCallback(
    (email) => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        return true;
      }
      setErrorMessage("???????????? ?????? ??????????????????.");
      return false;
    },
    []
  );

  const checkValidPassword = useCallback(
    (password) => {
      if (!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(password)) {
        setErrorMessage(
          "????????? + ??????/???????????? ???????????? 8~20????????? ???????????? ?????????."
        );
        return false;
      }
      const check_num = password.search(/[0-9]/g);
      const check_eng = password.search(/[a-z]/gi);
      if (check_num < 0 || check_eng < 0) {
        setErrorMessage("??????????????? ????????? ???????????? ??????????????? ?????????.");
        return false;
      }
      if (/(\w)\1\1\1/.test(password)) {
        setErrorMessage(
          "??????????????? ?????? ????????? 4??? ?????? ???????????? ??? ????????????."
        );
        return false;
      }
      return true;
    },
    []
  );

  const handleCheckForm = () => {
    if (inputEmail === "") {
      refEmail.current?.focus();
      setErrorMessage("E-mail??? ???????????????");
      return false;
    } else if (!checkValidEmail(inputEmail)) {
      refEmail.current?.focus();
      return false;
    }
    if (inputUserName === "") {
      refUserName.current?.focus();
      setErrorMessage("????????? ???????????????");
      return false;
    }
    if (!checkValidPassword(inputPassword)) {
      refPassword.current?.focus();
      return false;
    }
    if (inputPassword !== inputPasswordCheck) {
      refPasswordCheck.current?.focus();
      setErrorMessage("??????????????? ???????????? ????????????.");
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (handleCheckForm()) {
      axios
        .post(process.env.REACT_APP_API_URL + "/user/signup", {
          email: inputEmail,
          userName: inputUserName,
          password: inputPassword,
        })
        .then((res: any) => {
           // const token = res.headers.authorization.split(" ")[1];
          // if (res.status === 201) {
            handleCloseBtn();
            // dispatch(signIn(res.data, token, inputPassword));
            setModalComment("??????????????? ?????????????????????.");
            handleModalOpen();
            return  axios
            .post(process.env.REACT_APP_API_URL + "/user/login/", {
              email: inputEmail,
              password: inputPassword,
            })
            .then((res: any) => {
              const token = res.headers.authorization.split(" ")[1];
              if (token) {
                dispatch(signIn(res.data.user, token, inputPassword));
                handleCloseBtn();
                setModalComment("????????? ??????.");
                handleModalOpen();
              }
            })
            .catch((err: any) => {
              console.error(err); //response.status(404)????????????
              setErrorMessage("?????? ????????? ???????????? ????????????.");
            });
          // }
        })
        .catch((err: any) => {
          console.error(err);
          if (err.response.status === 401) {
            setErrorMessage("???????????? ??????????????????.");
            return;
          }
        });
    }
  };

  return (
    <>
      <Modal
        modalType="alertModal"
        open={openModal}
        close={handleModalClose}
        comment={modalComment}
      />
      {open ? (
        <div className="signin show">
          <div className="signup__outsider" onClick={handleCloseBtn}></div>
          <div className="signup__wrapper">
            {/* <button className="signup__close-btn" onClick={handleCloseBtn}>
              &times;
            </button> */}
            <div className="signup__form">
              <div className="signup__form__title">????????????</div>
              <ul className="signup__form__list">
                <li className="signup__form__list__item">
                  <p className="label">E-mail</p>
                  <input
                    className="email"
                    type="text"
                    placeholder="???????????? E-mail??? ??????????????????."
                    value={inputEmail}
                    onChange={handleChangeEmail}
                    onKeyPress={handleMoveToUserName}
                    ref={refEmail}
                  />
                </li>
                <li className="signup__form__list__item">
                  <p className="label">??????</p>
                  <input
                    className="username"
                    type="text"
                    placeholder="???????????? ????????? ??????????????????."
                    value={inputUserName}
                    onChange={handleChangeUserName}
                    onKeyPress={handleMoveTopassword}
                    ref={refUserName}
                  />
                </li>
                <li className="signup__form__list__item">
                  <p className="label">????????????</p>
                  <input
                    className="password"
                    type="password"
                    placeholder="Password"
                    value={inputPassword}
                    onChange={handleChangePassword}
                    onKeyPress={handleMoveTopasswordCheck}
                    ref={refPassword}
                  />
                </li>
                <li className="signup__form__list__item">
                  <p className="label">???????????? ??????</p>
                  <input
                    className="passwordcheck"
                    type="password"
                    placeholder="Password Check"
                    value={inputPasswordCheck}
                    onChange={handleChangePasswordCheck}
                    onKeyPress={handleMoveToSignUp}
                    ref={refPasswordCheck}
                  />
                </li>
              </ul>
              <p className="signup__form__error-message">{errorMessage}</p>
              <button
                className="signup__form__submit-btn"
                onClick={handleSignUp}
              >
                ????????????
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

export default Signup;
