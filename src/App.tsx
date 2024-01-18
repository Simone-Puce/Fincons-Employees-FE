import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import ProtectedRoutes from "./services/ProtectedRoutes";
import "bootstrap/dist/css/bootstrap.css";
import CreateUpdateEmployeeComponent from "./components/Pages/createUpdateEmployeeComponent/CreateEmployeeComponent";
import HeaderComponent from "./components/Pages/headerComponent/HeaderComponent";
import ListEmployeeComponent from "./components/Pages/listEmployeeComponent/ListEmployeeComponent";
import ViewEmployeeComponent from "./components/Pages/viewEmployeeComponent/ViewEmployeeComponent";
import LoginPageComponent from "./components/Pages/loginPageComponent/LoginPageComponent";
import RegisterPageComponent from "./components/Pages/registerPageComponent/RegisterPageComponent";
import FooterComponent from "./components/Pages/footerComponent/FooterComponent";
import HomePageComponent from "./components/Pages/homePageComponent/HomePageComponent";
import Update from "./components/Pages/updateComponent/Update";
import CreateCertificateEmployeeForm from "./components/Forms/CreateCertificateEmployeeForm";

function App() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [toDisplayList, setToDisplayList] = useState<string>("employees")

  return (
    <div>
      <Router>
        <HeaderComponent
          userEmail={selectedUser}
          setUserEmail={setSelectedUser}
          toDisplayList={toDisplayList}
          setToDisplayList={setToDisplayList}
        />
       
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoutes userEmail={selectedUser}  />}
            >
              <Route
                path="/employees"
                element={<ListEmployeeComponent toDisplayList={toDisplayList} setToDisplayList={setToDisplayList}/>}
              ></Route>
              <Route
                path="/add-employee"
                element={<CreateUpdateEmployeeComponent toDisplayList={toDisplayList} />}
              ></Route>
              <Route
                path="/home"
                element={<HomePageComponent userEmail={selectedUser} />}
              ></Route>
              <Route
                path="view-employee/:id"
                element={<ViewEmployeeComponent toDisplayList={toDisplayList}/>}
              ></Route>
               <Route
                path="update-employee/:id"
                element={<Update toDisplayList={toDisplayList}/>}
              ></Route>
               <Route
                path="/add/:id"
                element={<CreateCertificateEmployeeForm />}
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
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
