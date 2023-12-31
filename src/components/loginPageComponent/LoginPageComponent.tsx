import React, { FormEvent, useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import LoginRegistrationService from "../../services/LoginRegistrationService";
import LoginUserModel from "../../models/LoginUserModel";

interface Props {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const LoginPageComponent = (props: Props) => {
  const navigate = useNavigate();
  const [input, setInput] = useState<LoginUserModel>({
    name: "",
    email: "",
    password: "",
  });

  const navigateToRegister = () => {
    navigate("/register");
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    LoginRegistrationService.loginService(input.email, input.password).then(
      (res) => {
        if (res.data === "You are on the home page") {
          localStorage.setItem("loggedIn" + input.email, "true");
          props.setUserEmail(input.email);
          navigate("/home");
        } else {
          Swal.fire({
            title: "Error?",
            text: "Email or password are wrong ",
            icon: "error",
            confirmButtonText: "OK!",
          });
        }
      }
    );
  };

  return (
    <section className="background-radial-gradient">
      <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="my-5 display-5 fw-bold ls-tight">
              Registration test <br />
              <span>for your business</span>
            </h1>
            <p className="mb-4 opacity-70">
              Login form to use an applicative that manages employees
            </p>
          </div>
          <div className="col-lg-6 mb-2 mb-lg-0 position-relative">
            <div className="position-absolute rounded-circle shadow-5-strong"></div>
            <div className="position-absolute shadow-5-strong"></div>

            <motion.div className="card bg-glass rounded-5">
              <motion.div className="card-body px-2 py-3 px-md-4 mt-4">
                <form onSubmit={(e) => handleLogin(e)}>
                  <div className="d-flex justify-content-center">
                    <div>
                      <h3 className="text-center">
                        Login form for our employees managment system
                      </h3>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <div className="form-floating d-flex justify-content-evenly"></div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <motion.div className="form-floating">
                        <motion.input
                          whileFocus={{
                            scale: 1.2,
                          }}
                          type="email"
                          name="email"
                          value={input.email}
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          className={"form-control rounded-4"}
                          placeholder="Name here"
                        />
                        <label className="ms-2" htmlFor="floatingInputInvalid">
                          Insert your email
                        </label>
                      </motion.div>
                    </div>
                  </div>
                  <div className="form-outline mb-4">
                    <div className="row">
                      <div className="form-floating">
                        <motion.input
                          whileFocus={{
                            scale: 1.2,
                          }}
                          type="password"
                          name="password"
                          value={input.password}
                          onChange={(e) => {
                            setInput({
                              ...input,
                              [e.target.name]: e.target.value,
                            });
                          }}
                          className={"form-control rounded-4"}
                          placeholder="Insert your email here"
                        />
                        <label className="ms-2" htmlFor="floatingInputInvalid">
                          Insert your password
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="align-items-center">
                    <div className="d-flex justify-content-center">
                      <motion.button
                        whileHover={{
                          scale: 1.2,
                          transition: { duration: 0.5 },
                        }}
                        type="submit"
                        className="btn btn-primary btn-block btn-lg mb-4 rounded-pill "
                        //onClick={handleLogin}
                      >
                        Sign in
                      </motion.button>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p>
                        {" "}
                        Non sei ancora registrato?{" "}
                        <a
                          onClick={navigateToRegister}
                          className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                        >
                          Registrati
                        </a>
                      </p>
                    </div>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPageComponent;
