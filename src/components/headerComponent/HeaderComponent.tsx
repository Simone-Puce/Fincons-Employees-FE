import React, { useEffect, useState } from "react";
import "./HeaderComponent.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import utils from "../../utils/Utils";
import LoginRegistrationService from "../../services/LoginRegistrationService";
import UserDetailModels from "../../models/UserDetailsModel";

interface Props {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderComponent = (props: Props) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("loggedIn" + props.userEmail);
  const [userDetails, setUserDetails] = useState<UserDetailModels>();
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn" + props.userEmail);
    LoginRegistrationService.logout();
    navigate("login");
    setIsHidden(true);
  };

  const handleEmployeeList = () => {
    navigate("/employees");
  };

  useEffect(() => {
    if (auth !== null) {
      LoginRegistrationService.getHome();
      setIsHidden(false);
      LoginRegistrationService.getUserDetails(props.userEmail).then((res) =>
        setUserDetails(res.data)
      );
    } else {
      setIsHidden(true);
    }
  }, [auth,props.userEmail]);

  const userNameDisplay = () => {
    if (userDetails?.firstName === undefined) {
      return "";
    } else {
      return (
        utils.capitalizeFirstLetter(userDetails?.firstName) +
        " " +
        utils.capitalizeFirstLetter(userDetails?.lastName)
      );
    }
  };

  return (
    <nav className="navbar fixed-top mb-5 position-absolute">
      <div className="container-fluid">
        <div className="centered-navbar">
          <h2>Employee Manager</h2>
        </div>
        <button
          hidden={isHidden}
          className="navbar-toggler close-navbar-button border-0 btn-lg"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          {userNameDisplay()} <i className="bi bi-person-circle"></i>
        </button>
        <div
          className="offcanvas offcanvas-end offcanvas-width"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header d-flex justify-content-center">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              {userNameDisplay()}
            </h5>
            <button
              type="button"
              className="btn-close closing-button"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{
                position: "absolute",
                right: 0,
                marginRight: "10px",
              }}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 ">
              {" "}
              <li className="nav-item  d-flex justify-content-center mb-3">
                <button
                  onClick={handleEmployeeList}
                  data-bs-dismiss="offcanvas"
                  className="btn btn-outline-primary btn-lg"
                >
                  Employees
                </button>
              </li>
              <li className="nav-item d-flex justify-content-center mb-3">
                <button
                  onClick={handleLogout}
                  data-bs-dismiss="offcanvas"
                  className="btn btn-outline-danger btn-lg"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
