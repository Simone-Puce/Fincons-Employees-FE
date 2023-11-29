import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { useState } from "react";
import ProtectedRoutes from "./services/ProtectedRoutes";
import 'bootstrap/dist/css/bootstrap.css';
import CreateUpdateEmployeeComponent from "./components/createUpdateEmployeeComponent/CreateUpdateEmployeeComponent";
import HeaderComponent from "./components/headerComponent/HeaderComponent";
import ListEmployeeComponent from "./components/listEmployeeComponent/ListEmployeeComponent";
import ViewEmployeeComponent from "./components/viewEmployeeComponent/ViewEmployeeComponent";
import LoginPageComponent from "./components/loginPageComponent/LoginPageComponent";
import RegisterPageComponent from "./components/registerPageComponent/RegisterPageComponent";
import FooterComponent from "./components/footerComponent/FooterComponent";

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
              path="view-employee/:id"
              element={<ViewEmployeeComponent />}
            ></Route>
          </Route>{}
          <Route
            path="/login"
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
