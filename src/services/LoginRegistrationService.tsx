import axios from "axios";
import User from "../models/UserModel";

const REGISTRATION_LOGIN_BASE_URI =
  "http://localhost:81/be/company-employee-management";
const VERSION_URI = REGISTRATION_LOGIN_BASE_URI + "/v1";
const REGISTRATION_URI = VERSION_URI + "/register";
const LOGIN_URI = VERSION_URI + "/login";
const HOME_URI = VERSION_URI + "/home";
const SESSION_VALUE_URI = VERSION_URI + "/session-value";
const LOGOUT_URI = VERSION_URI + "/logout";
const USER_DETAILS_URI = VERSION_URI + "/email";

const LoginRegistrationService = {
  registrationService(user: User) {
    return axios.post(REGISTRATION_URI, user);
  },

  loginService(username: string, password: string) {
    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "withCredentials": "true",
    };
    return axios.post(LOGIN_URI, data, {headers: headers});
  },

  getSessionValue() {
    return axios.get(SESSION_VALUE_URI);
  },

  logout() {
    return axios.post(LOGOUT_URI);
  },

  getHome() {
    return axios.get(HOME_URI);
  },
  getUserDetails(userEmail: string) {
    return axios.get(USER_DETAILS_URI, {
      params: { email: userEmail },
    });
  },
};

export default LoginRegistrationService;
