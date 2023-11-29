import React, { useEffect, useState } from "react";
import "./HeaderComponent.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import utils from "../../utils/Utils";

interface Props {
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderComponent = (props: Props) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("loggedIn" + props.userEmail);
  const userName = JSON.parse(
    localStorage.getItem("user" + props.userEmail) || "{}"
  );
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn" + props.userEmail);
    navigate("login");
    setIsHidden(true);
  };

  const handleEmployeeList = () => {
    navigate("/employees");
  };

  useEffect(() => {
    if (auth !== null) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [auth]);

  const userNameDisplay = () => {
    if (userName === undefined) {
      return "";
    } else {
      return utils.capitalizeFirstLetter(userName.name) + " " + utils.capitalizeFirstLetter(userName.surname) ;
    }
  };

  return (
    <nav className="navbar fixed-top mb-5 position-absolute">
      <div className="container-fluid">
        <div className="centered-navbar">
          <h2>Offcanvas navbar</h2>
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
                position:"absolute",
                right: 0,
                marginRight: "10px"
              }}
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 ">
              {" "}
              <li className="nav-item  d-flex justify-content-center mb-3">
                <button
                  onClick={handleEmployeeList}
                  className="btn btn-outline-primary btn-lg"
                >
                  Employees
                </button>
              </li>
              <li className="nav-item d-flex justify-content-center mb-3">
                <button
                  onClick={handleLogout}
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

/*<nav className="navbar bg-dark navbar-dark">
      <a className="navbar-brand text-white">Navbar</a>
      <ul className="navbar-nav mr-4 pr-4">
        <div hidden={isHidden} className="dropdown mr-5 btn-gruop">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {userName.name} <i className="bi bi-person-circle"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start"
          style={{width:"50%"}}>
            <li>
              <button
                onClick={handleLogout}
                className="btn btn-secondary dropdown-item"
              >
                Logout
              </button>
            </li>
            <li>
              <button
                onClick={handleEmployeeList}
                className="btn btn-secondary dropdown-item "
              >
                Employees
              </button>
            </li>
          </ul>
        </div>
      </ul>
    </nav>*/
