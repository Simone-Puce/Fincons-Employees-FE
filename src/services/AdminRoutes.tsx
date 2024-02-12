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
            setIsAdmin(res.data.data.roles[0].name)
        })
    }, [userEmail])

    if (isAdmin === null) {
        return null;
    }

    return isAdmin === 'ROLE_ADMIN' ? <Outlet /> : <Navigate to={"/error"} />
}

export default AdminRoutes;
