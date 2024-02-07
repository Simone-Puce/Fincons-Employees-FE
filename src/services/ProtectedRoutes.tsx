import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

interface Props {
    userEmail: string 
}

const ProtectedRoutes = ( props : Props) =>{
    const auth = Cookies.get("jwt-token")
    return auth ? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoutes;