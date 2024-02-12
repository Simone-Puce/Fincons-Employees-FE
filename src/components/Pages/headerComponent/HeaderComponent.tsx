import React, { useEffect, useState } from "react";
import "./HeaderComponent.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import utils from "../../../utils/Utils";
import LoginRegistrationService from "../../../services/LoginRegistrationService";
import UserDetailModels from "../../../models/UserDetailsModel";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface Props {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  toDisplayList: string;
  setToDisplayList: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderComponent = (props: Props) => {
  const navigate = useNavigate();
  const auth = Cookies.get("jwt-token");
  const [userDetails, setUserDetails] = useState<UserDetailModels>();
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const handleLogout = () => {
    Cookies.remove("jwt-token");
    LoginRegistrationService.logout();
    navigate("login");
    setIsHidden(true);
  };

  const handleProfile = () => {
    navigate("/profile")
  }

  useEffect(() => {
    if (auth !== undefined) { 
      const jwt = jwtDecode(auth!)
      setIsHidden(false);
      LoginRegistrationService.getUserDetails(jwt.sub).then((res) =>{
        setUserDetails(res.data.data)
      }
      );
    } else {
      setIsHidden(true);
    }
  }, [auth]);

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
    <nav className="navbar fixed-top mb-5 position-absolute ">
      <div className="container-fluid d-flex align-items-center">
        <div className="centered-navbar align-self-start">
          <h2 className="text-white">Employee Manager</h2>
        </div>
        <button
          hidden={isHidden}
          className="navbar-toggler close-navbar-button border-0 btn-lg text-white aling-middle"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          {userNameDisplay()} <i className="bi bi-person-circle text-white"></i>
        </button>
        <div
          className="offcanvas offcanvas-end offcanvas-width"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header d-flex justify-content-center menu-style">
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
          <div className="offcanvas-body menu-style">
            <ul className="navbar-nav justify-content-end flex-grow-1 ">
              <li className="nav-item d-flex justify-content-center mb-3">
                <button
                  onClick={handleLogout}
                  data-bs-dismiss="offcanvas"
                  className="btn btn-canvas w-50"
                >
                  Logout
                </button>
              </li>
              <li className="nav-item d-flex justify-content-center mb-3">
                <button
                  onClick={handleProfile}
                  data-bs-dismiss="offcanvas"
                  className="btn btn-canvas w-50"
                >
                  Profile
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