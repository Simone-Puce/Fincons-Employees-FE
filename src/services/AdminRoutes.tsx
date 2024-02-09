import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import LoginRegistrationService from "./LoginRegistrationService";
import { useEffect, useState } from "react";

const AdminRoutes = () => {
    const auth = Cookies.get("jwt-token")
    const decodedJwt = jwtDecode(auth!)
    const userEmail = decodedJwt.sub
    const [isAdmin, setIsAdmin] = useState<string | null>(null)

    useEffect(() => {
        LoginRegistrationService.getUserDetails(userEmail).then((res) => {
            console.log(res.data.data.roles[0].name)
            setIsAdmin(res.data.data.roles[0].name)
        })
    }, [])

    if (isAdmin === null) {
        return null;
    }

    return isAdmin === 'ROLE_ADMIN' ? <Outlet /> : <Navigate to={"/profile"} />

}

export default AdminRoutes;
