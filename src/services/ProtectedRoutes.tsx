
import { Navigate, Outlet } from "react-router-dom"

interface Props {
    userEmail: string 
}

const ProtectedRoutes = ( props : Props) =>{
    const auth = localStorage.getItem("loggedIn")
    return auth ? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoutes