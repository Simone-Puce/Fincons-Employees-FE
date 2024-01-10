import { useEffect, useState } from "react";
import LoginRegistrationService from "../../services/LoginRegistrationService";

interface Props{
    userEmail: string;
}

const HomePageComponent = (props : Props ) => {

  useEffect(()=>{
    LoginRegistrationService.getHome()
  },[])
  return (
    <div className="container d-flex mt-5 pt-5">
        <h1>{props.userEmail}</h1>
    </div>
  );
};

export default HomePageComponent;
