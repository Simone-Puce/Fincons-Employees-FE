import axios from "axios";
import User from "../models/UserModel";
import LoginUserModel from "../models/LoginUserModel";
import Cookies from "js-cookie";
import UserDetailsModel from "../models/UserDetailsModel";

const REGISTRATION_LOGIN_BASE_URI =
  "http://localhost:8080/company-employee-management";
const VERSION_URI = REGISTRATION_LOGIN_BASE_URI + "/v1";
const REGISTRATION_URI = VERSION_URI + "/register";
const LOGIN_URI = VERSION_URI + "/login";
const SESSION_VALUE_URI = VERSION_URI + "/session-value";
const LOGOUT_URI = VERSION_URI + "/logout";
const UPDATE_USER_DETAILS = VERSION_URI + "/update-user"
const token = Cookies.get("jwt-token")

const LoginRegistrationService = {
  registrationService(user: User) {
    return axios.post(REGISTRATION_URI, user);
  },

  updateUserData(updatedUserDetails : UserDetailsModel){
    return axios.put(
      UPDATE_USER_DETAILS,
      {
        firstName: updatedUserDetails.firstName,
        lastName: updatedUserDetails.lastName,
        email: updatedUserDetails.email,
        password: updatedUserDetails.password
      },
      {
        params: { email: updatedUserDetails.email },
        headers: { Authorization: `Bearer ${token}`}
      }
    )
  },

  loginService(loginInput: LoginUserModel) {
    return axios.post(
      LOGIN_URI,
      loginInput
    )
  },

  getSessionValue() {
    return axios.get(SESSION_VALUE_URI);
  },

  logout() {
    return axios.post(LOGOUT_URI);
  }
};

export default LoginRegistrationService;
