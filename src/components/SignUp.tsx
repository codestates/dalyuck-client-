import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const axios: any = require("axios");
axios.default.withCredentials = true;

type SignupProps = {
  open?: boolean;
  close: () => void;
};

const Signup = (props: SignupProps) => {
  const { open, close } = props;

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
    [inputEmail]
  );

  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputUserName(e.target?.value);
    },
    [inputUserName]
  );
  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputPassword(e.target?.value);
    },
    [inputPassword]
  );
  const handleChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputPasswordCheck(e.target?.value);
    },
    [inputPasswordCheck]
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
      setErrorMessage("유효하지 않은 이메일입니다.");
      return false;
    },
    [inputEmail, errorMessage]
  );

  const checkValidPassword = useCallback(
    (password) => {
      if (!/^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/.test(password)) {
        setErrorMessage(
          "영문자 + 숫자/특수문자 조합으로 8~20자리를 사용해야 합니다."
        );
        return false;
      }
      const check_num = password.search(/[0-9]/g);
      const check_eng = password.search(/[a-z]/gi);
      if (check_num < 0 || check_eng < 0) {
        setErrorMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
        return false;
      }
      if (/(\w)\1\1\1/.test(password)) {
        setErrorMessage(
          "비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다."
        );
        return false;
      }
      return true;
    },
    [inputPassword, errorMessage]
  );

  const handleCheckForm = () => {
    if (inputEmail === "") {
      refEmail.current?.focus();
      setErrorMessage("E-mail을 입력하세요");
      return false;
    } else if (!checkValidEmail(inputEmail)) {
      refEmail.current?.focus();
      return false;
    }
    if (inputUserName === "") {
      refUserName.current?.focus();
      setErrorMessage("이름을 입력하세요");
      return false;
    }
    if (!checkValidPassword(inputPassword)) {
      refPassword.current?.focus();
      return false;
    }
    if (inputPassword !== inputPasswordCheck) {
      refPasswordCheck.current?.focus();
      setErrorMessage("비밀번호와 일치하지 않습니다.");
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (handleCheckForm()) {
      axios
        .post(`http://localhost:3000/user/signup`, {
          email: inputEmail,
          userName: inputUserName,
          password: inputPassword,
        })
        .then((body: any) => {
          if (body.status === 201) {
            handleCloseBtn();
            setModalComment("회원가입이 완료되었습니다.");
            handleModalOpen();
            return;
          } else if (body.status === 401) {
            refEmail.current?.focus();
            setErrorMessage("사용중인 이메일입니다.");
            return;
          } else {
            setErrorMessage("오류가 발생했습니다.");
            return;
          }
        })
        .catch((err: any) => console.error(err));
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
      <div className={`signup ${open ? "show" : ""}`}>
        {open ? (
          <>
            <div className="signup__outsider" onClick={handleCloseBtn}></div>
            <div className="signup__wrapper">
              <button className="signup__close-btn" onClick={handleCloseBtn}>
                &times;
              </button>
              <div className="signup__form">
                <div className="signup__form__title">회원가입</div>
                <ul className="signup__form__list">
                  <li className="signup__form__list__item">
                    <p className="label">E-mail</p>
                    <input
                      className="email"
                      type="text"
                      placeholder="사용하실 E-mail을 입력해주세요."
                      value={inputEmail}
                      onChange={handleChangeEmail}
                      onKeyPress={handleMoveToUserName}
                      ref={refEmail}
                    />
                  </li>
                  <li className="signup__form__list__item">
                    <p className="label">이름</p>
                    <input
                      className="username"
                      type="text"
                      placeholder="사용하실 이름을 입력해주세요."
                      value={inputUserName}
                      onChange={handleChangeUserName}
                      onKeyPress={handleMoveTopassword}
                      ref={refUserName}
                    />
                  </li>
                  <li className="signup__form__list__item">
                    <p className="label">비밀번호</p>
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
                    <p className="label">비밀번호 확인</p>
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
                  회원가입
                </button>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Signup;