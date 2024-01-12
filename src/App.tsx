import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import ProtectedRoutes from "./services/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.css";
import CreateUpdateEmployeeComponent from "./components/createUpdateEmployeeComponent/CreateEmployeeComponent";
import HeaderComponent from "./components/headerComponent/HeaderComponent";
import ListEmployeeComponent from "./components/listEmployeeComponent/ListEmployeeComponent";
import ViewEmployeeComponent from "./components/viewEmployeeComponent/ViewEmployeeComponent";
import LoginPageComponent from "./components/loginPageComponent/LoginPageComponent";
import RegisterPageComponent from "./components/registerPageComponent/RegisterPageComponent";
import FooterComponent from "./components/footerComponent/FooterComponent";
import HomePageComponent from "./components/homePageComponent/HomePageComponent";
import Update from "./components/updateComponent/Update";

function App() {
  const [selectedUser, setSelectedUser] = useState<string>("");

  return (
    <div>
      <Router>
        <HeaderComponent
          userEmail={selectedUser}
          setUserEmail={setSelectedUser}
        />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoutes userEmail={selectedUser} />}
            >
              <Route
                path="/employees"
                element={<ListEmployeeComponent />}
              ></Route>
              <Route
                path="/add-employee"
                element={<CreateUpdateEmployeeComponent />}
              ></Route>
              <Route
                path="/home"
                element={<HomePageComponent userEmail={selectedUser} />}
              ></Route>
              <Route
                path="view-employee/:id"
                element={<ViewEmployeeComponent />}
              ></Route>
               <Route
                path="update-employee/:id"
                element={<Update />}
              ></Route>
            </Route>
            {}
            <Route
              path="/login"
              element={
                <LoginPageComponent
                  userEmail={selectedUser}
                  setUserEmail={setSelectedUser}
                />
              }
            ></Route>
            <Route
              path="/"
              element={
                <LoginPageComponent
                  userEmail={selectedUser}
                  setUserEmail={setSelectedUser}
                />
              }
            ></Route>
            <Route path="/register" element={<RegisterPageComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
