import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmRegistrationModal from "../confirmRegistrationModal/ConfirmRegistrationModal";
import 'bootstrap/dist/css/bootstrap.css';
import User from "../../models/UserModel";
import LoginRegistrationService from "../../services/LoginRegistrationService";




const RegisterPageComponent = () => {
  const [input, setInput] = useState<User>();
  const passwordSpecialCharacterCheck = RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
  const passwordUppercaseLetterCheck = RegExp(/[A-Z]/)
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [emailFieldWarning, setEmailFieldWarning] = useState("is-invalid");
  const [passwordFieldWarning, setPasswordFieldWarning] =
    useState("is-invalid");
  const [confirmPasswordFieldWarning, setConfirmPasswordFieldWarning] =
    useState("is-invalid");
  const [nameFieldWarning, setNameFieldWarning] = useState("is-invalid");
  const [surnameFieldWarning, setSurnameFieldWarning] = useState("is-invalid");
  const [passwordShow, setPasswordShow] = useState("password");
  const [confirmPasswordShow, setConfirmPasswordShow] = useState("password");
  const [iconToShowConfirm, setIconToShowConfirm] = useState(
    <i className="bi bi-eye-slash"></i>
  );
  const [iconToShow, setIconToShow] = useState(
    <i className="bi bi-eye-slash"></i>
  );
  const navigate = useNavigate();
  const [firstCheckIcon, setFirstCheckIcon] = useState<boolean>(false);
  const [secondCheckIcon, setSecondCheckIcon] = useState<boolean>(false);
  const [thirdCheckIcon, setThirdCheckIcon] = useState<boolean>(false);
  const [birthDateValid, setBirthDateValid] = useState<boolean>(false);
  const [passwordDetails, setPasswordDetails] = useState(true);

  const firstPasswordRestriction = () => {
    if (firstCheckIcon === false) {
      return <i className="bi bi-emoji-frown"></i>;
    } else {
      return <i className="bi bi-emoji-smile"></i>;
    }
  };

  const secondPasswordRestriction = () => {
    if (secondCheckIcon === false) {
      return <i className="bi bi-emoji-frown"></i>;
    } else {
      return <i className="bi bi-emoji-smile"></i>;
    }
  };

  const thirdPasswordRestriction = () => {
    if (thirdCheckIcon === false) {
      return <i className="bi bi-emoji-frown"></i>;
    } else {
      return <i className="bi bi-emoji-smile"></i>;
    }
  };

  const birthDateCheck = (value: string) => {
    if (value !== null && value !== undefined && value !== "") {
      setBirthDateValid(true);
    } else {
      setBirthDateValid(false);
    }
    checkSubmit();
  };

  const checkSubmit = () => {
    if (
      input !== undefined &&
      input.firstName !== null &&
      input.firstName.length >= 1 &&
      input.lastName !== null &&
      input.lastName.length >= 1 &&
      emailFieldWarning === "is-valid" &&
      passwordFieldWarning === "is-valid" &&
      confirmPasswordFieldWarning === "is-valid"
      //birthDateValid === true
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    checkSubmit();
  }, [
    emailFieldWarning,
    passwordFieldWarning,
    confirmPasswordFieldWarning,
    birthDateValid,
  ]);

  const handleRegistration = () => {
    LoginRegistrationService.registrationService(input!)
  };

  const checkEmail = (e: string) => {
    if (e.includes("@") && e.length >= 10) {
      setEmailFieldWarning("is-valid");
    } else {
      setEmailFieldWarning("is-invalid");
    }
    checkSubmit();
  };

  const checkPassword = (e: string) => {
    let tempFirstCheck = false;
    let tempSecondCheck = false;
    let tempThirdCheck = false;
    if (e.length >= 8) {
      tempFirstCheck = true;
      setFirstCheckIcon(true);
    } else {
      tempFirstCheck = false;
      setFirstCheckIcon(false);
    }
    if (passwordUppercaseLetterCheck.test(e)) {
      //controlla che almeno un carattere maiuscolo sia  presente
      tempSecondCheck = true;
      setSecondCheckIcon(true);
    } else {
      tempSecondCheck = false;
      setSecondCheckIcon(false);
    }
    if (passwordSpecialCharacterCheck.test(e)) {
      tempThirdCheck = true;
      setThirdCheckIcon(true);
    } else {
      tempThirdCheck = false;
      setThirdCheckIcon(false);
    }
    if (
      tempFirstCheck === true &&
      tempSecondCheck === true &&
      tempThirdCheck === true
    ) {
      setPasswordFieldWarning("is-valid");
    } else {
      setPasswordFieldWarning("is-invalid");
    }
    checkSubmit();
  };

  const checkConfirmPassword = (e: string) => {
    if (e === input?.password) {
      setConfirmPasswordFieldWarning("is-valid");
    } else {
      setConfirmPasswordFieldWarning("is-invalid");
    }
  };

  const checkName = (e: string) => {
    if (e !== undefined && e !== "") {
      setNameFieldWarning("is-valid");
    } else {
      setNameFieldWarning("is-invalid");
    }
  };

  const checkSurname = (e: string) => {
    if (e !== undefined && e !== "") {
      setSurnameFieldWarning("is-valid");
    } else {
      setSurnameFieldWarning("is-invalid");
    }
  };

  const showPassword = () => {
    if (passwordShow === "password") {
      setPasswordShow("text");
      setIconToShow(<i className="bi bi-eye"></i>);
    } else {
      setPasswordShow("password");
      setIconToShow(<i className="bi bi-eye-slash"></i>);
    }
  };

  const showPasswordConfirm = () => {
    if (confirmPasswordShow === "password") {
      setConfirmPasswordShow("text");
      setIconToShowConfirm(<i className="bi bi-eye"></i>);
    } else {
      setConfirmPasswordShow("password");
      setIconToShowConfirm(<i className="bi bi-eye-slash"></i>);
    }
  };

  const showDetails = () => {
    if (passwordDetails === true) {
      setPasswordDetails(false);
    } else {
      setPasswordDetails(true);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="my-5 display-5 fw-bold ls-tight">
              Registration test <br />
              <span>for your business</span>
            </h1>
            <p className="mb-4 opacity-70">
              Registration form to use an applicative that manages employees
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div className="position-absolute rounded-circle shadow-5-strong"></div>
            <div className="position-absolute shadow-5-strong"></div>

            <div className="card bg-glass rounded-5">
              <div className="card-body px-4 py-5 px-md-4">
                <form>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <div className="form-floating d-flex justify-content-around">
                        <div className="d-flex">
                          <motion.input
                           whileFocus={{
                            scale: 1.2,
                          }}
                            name="firstName"
                            value={input?.firstName}
                            onChange={(e) => {
                              setInput({
                                ...input!,
                                [e.target.name]: e.target.value,
                              });
                              checkName(e.target.value);
                            }}
                            className={
                              "form-control rounded-4 pd-3 " + nameFieldWarning
                            }
                            placeholder="Name here"
                          />
                          <label className="ms-2"></label>
                          <motion.input
                           whileFocus={{
                            scale: 1.2,
                          }}
                            name="lastName"
                            value={input?.lastName}
                            onChange={(e) => {
                              setInput({
                                ...input!,
                                [e.target.name]: e.target.value,
                              });
                              checkSurname(e.target.value);
                            }}
                            className={
                              "form-control rounded-4 " + surnameFieldWarning
                            }
                            placeholder="Surname here"
                          />
                          <label className="ms-2"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <div className="form-floating">
                        <motion.input
                           whileFocus={{
                            scale: 1.2,
                          }}
                          name="email"
                          value={input?.email}
                          onChange={(e) => {
                            setInput({
                              ...input!,
                              [e.target.name]: e.target.value,
                            });
                            checkEmail(e.target.value);
                          }}
                          type="email"
                          className={
                            "form-control rounded-4 " + emailFieldWarning
                          }
                          id="floatingInputInvalid"
                          placeholder="Insert your email here"
                        />
                        <label className="ms-2" htmlFor="floatingInputInvalid">
                          Insert your email
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <div className="form-floating input-gruop d-flex">
                        <motion.input
                           whileFocus={{
                            scale: 1.2,
                          }}
                          onFocus={showDetails}
                          onBlur={showDetails}
                          type={passwordShow}
                          name="password"
                          value={input?.password}
                          onChange={(e) => {
                            setInput({
                              ...input!,
                              [e.target.name]: e.target.value,
                            });
                            checkPassword(e.target.value);
                          }}
                          className={
                            "form-control rounded-4 " + passwordFieldWarning
                          }
                        />
                        <button
                          type="button"
                          className="input-group-text border border-primary rounded-5 ms-3"
                          onClick={showPassword}
                        >
                          {iconToShow}
                        </button>

                        <label className="ms-2" htmlFor="floatingInputInvalid">
                          Insert your password
                        </label>
                      </div>
                    </div>
                    <div hidden={passwordDetails}>
                      <div className="mb-1 mt-2">
                        {" "}
                        {firstPasswordRestriction()} Almeno 8 lettere{" "}
                      </div>
                      <div className="mb-1">
                        {" "}
                        {secondPasswordRestriction()} Almeno un carattere
                        maiuscolo
                      </div>
                      <div className="mb-1">
                        {" "}
                        {thirdPasswordRestriction()} Almeno un carattere
                        speciale
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <div className="form-floating input-gruop d-flex">
                        <motion.input
                           whileFocus={{
                            scale: 1.2,
                          }}
                          type={confirmPasswordShow}
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            checkConfirmPassword(e.target.value);
                          }}
                          className={
                            "form-control rounded-4 " +
                            confirmPasswordFieldWarning
                          }
                        />

                        <button
                          type="button"
                          className="input-group-text border border-primary rounded-5 ms-3"
                          onClick={showPasswordConfirm}
                        >
                          {iconToShowConfirm}
                        </button>

                        <label className="ms-2" htmlFor="floatingInputInvalid">
                          Repeat your password
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <div className="form-floating d-flex justify-content-center">
                        {/*<div className="d-flex justify-content-center mt-2">
                          Insert your birth date
                        </div>
                        <div className="d-flex justify-content-center">
                          <motion.input
                           whileFocus={{
                            scale: 1.2,
                          }}
                            name="date"
                            type="date"
                            className="form-control text-center border-0 border-white"
                            onChange={(e) => {
                              setInput({
                                ...input,
                                [e.target.name]: e.target.value,
                              });
                              birthDateCheck(e.target.value);
                              checkSubmit();
                            }}
                          />
                        </div>*/}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center">
                    <ConfirmRegistrationModal
                      handleRegistration={handleRegistration}
                      disabledButton={disabledButton}
                      setDisabledButton={setDisabledButton}
                      checkSubmit={checkSubmit}
                    />
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={handleBackToLogin}
                    >
                      {" "}
                      Go back to login{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPageComponent;
