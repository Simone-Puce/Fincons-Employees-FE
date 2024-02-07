import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = BASE_URL + "/v1";
const UPDATE_PASSWORD_URI = VERSION_URI+"/update-user-password"
const token = Cookies.get("jwt-token");

const UserService = {

    updateUserPassword(userEmail: string, oldPassword: string, newPassword: string) {
        return axios.put(
            UPDATE_PASSWORD_URI, {}, {
            params: {
                email: userEmail,
                password: oldPassword,
                newPassword: newPassword
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
    }
}

export default UserService;