import React from "react"
import { Navigate, Outlet } from "react-router-dom"

interface Props {
    userEmail: string
}

const ProtectedRoutes = ( props : Props) =>{
    const auth = localStorage.getItem("loggedIn"+props.userEmail)
    return auth ? <Outlet/> : <Navigate to={"/login"}/>

}

export default ProtectedRoutes