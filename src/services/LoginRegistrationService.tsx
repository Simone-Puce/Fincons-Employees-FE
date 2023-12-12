import axios from "axios";
import User from "../models/UserModel";
import { Form } from "react-router-dom";

const REGISTRATION_LOGIN_BASE_URI = "http://localhost:8080/company-employee-management"
const VERSION_URI =  REGISTRATION_LOGIN_BASE_URI+"/v1";
const REGISTRATION_URI = VERSION_URI+"/register";
const LOGIN_URI = VERSION_URI+"/login";

const LoginRegistrationService = {

    registrationService(user: User){
        return axios.post(REGISTRATION_URI, user )
    },

    LoginService(username: string, password: string){
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
        }
        return axios.post(LOGIN_URI,data,{headers: headers})
    }
}

export default LoginRegistrationService;