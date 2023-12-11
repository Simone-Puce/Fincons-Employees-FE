import axios from "axios";
import User from "../models/UserModel";

const REGISTRATION_LOGIN_BASE_URI = "http://localhost:8080/company-employee-managment"
const VERSION_URI =  REGISTRATION_LOGIN_BASE_URI+"/v1";
const REGISTRATION_URI = VERSION_URI+"/register";
const LOGIN_URI = VERSION_URI+"/login";

const LoginRegistrationService = {

    registrationService(user: User){
        return axios.post(REGISTRATION_URI, user )
    },
    LoginService(){
        return axios.post(LOGIN_URI)
    }
}

export default LoginRegistrationService;