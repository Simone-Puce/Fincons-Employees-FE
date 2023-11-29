import React, { useEffect, useState } from "react";
import "./HeaderComponent.css";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


interface Props {
  userEmail: string,
  setUserEmail: React.Dispatch<React.SetStateAction<string>>
}

const HeaderComponent = (props: Props) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("loggedIn" + props.userEmail);
  const userName = JSON.parse(localStorage.getItem("user" + props.userEmail) || "{}");
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn" + props.userEmail);
    navigate("login");
    setIsHidden(true)
  };


  const handleEmployeeList = () => {
    navigate("/employees")
  }

  useEffect(() => {
    if (auth !== null) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  }, [auth]);

  return (
    <nav className="navbar navbar-expand-md navbar-brand-center navbar-dark bg-dark">
      <div className="container-fluid d-flex">
      <div className="navbar-brand">
          Employee Manager
        </div>
        <div className="d-flex justify-content-end navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-4 pr-4">
            <div hidden={isHidden} className="dropdown mr-5 btn-gruop dropstart pr-5">
              <button
                className="btn btn-secondary drop-start dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
               
              >
                {userName.name} <i className="bi bi-person-circle"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button onClick={handleLogout} className="btn btn-secondary dropdown-item">
                    Logout
                  </button>
                </li>
                <li>
                  <button onClick={handleEmployeeList} className="btn btn-secondary dropdown-item">
                    Employees
                  </button>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
