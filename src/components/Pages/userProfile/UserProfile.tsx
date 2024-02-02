import { useNavigate } from "react-router-dom";
import UserDetailsInput from "../../Forms/UserDetailsInput";
import { useEffect, useState } from "react";
import UserDetailModels from "../../../models/UserDetailsModel";
import Cookies from "js-cookie";
import LoginRegistrationService from "../../../services/LoginRegistrationService";
import { jwtDecode } from "jwt-decode";
import PasswordUpdateModel from "../../../models/PasswordUpdateModel";
import Swal from "sweetalert2";
import UserService from "../../../services/UserService";
import './UserProfile.css'

const UserProfile = () => {
    const navigate = useNavigate();
    const [updatingData, setUpdatingData] = useState<boolean>(false)
    const [updatingPassword, setUpdatingPassword] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<UserDetailModels>()
    const [isUpdateValid, setIsUpdateValid] = useState<boolean>(true)
    const [passwordUpdateValues, setPasswordUpdateValues] = useState<PasswordUpdateModel>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [isPasswordUpdateValid, setIsPasswordUpdateValid] = useState<boolean>(true)
    const jwt = Cookies.get("jwt-token")

    useEffect(() => {
        const subJWT = jwtDecode(jwt!)
        LoginRegistrationService.getUserDetails(subJWT.sub).then((res) => {
            setUserDetails(res.data.data)
        })
    }, [updatingData, updatingPassword,jwt])

    const handleUpdateAnagraphic = () => {
        setUpdatingData(true)
        setUpdatingPassword(false)
    }

    const handleCancelUpdateClick = () => {
        setUpdatingData(false)
        setUpdatingPassword(false)
    }

    const handleUpdateConfirm = () => {
        LoginRegistrationService.updateUserData(userDetails!)
        setUpdatingData(!updatingData)
    }

    const handlePasswordUpdate = () => {
        if(passwordUpdateValues.confirmPassword !== passwordUpdateValues.newPassword){
            Swal.fire({
                title: "Warning?",
                text: "Password and confirm password do not match ",
                icon: "warning",
                confirmButtonText: "OK!",
              });
        } else if(passwordUpdateValues.oldPassword === passwordUpdateValues.newPassword){
            Swal.fire({
                title: "Warning?",
                text: "The new password cannot be the same as the old password ",
                icon: "warning",
                confirmButtonText: "OK!",
              });
            }else{
                UserService.updateUserPassword(
                    userDetails?.email!, 
                    passwordUpdateValues.oldPassword, 
                    passwordUpdateValues.newPassword!
                ).then((res)=>{
                    if(res.data.success === false){
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong please check the values again",
                            icon: "error",
                            confirmButtonText: "OK!",
                          });
                    }else{
                        Swal.fire({
                            title: "Success",
                            text: "Your password has been updated",
                            icon: "success",
                            confirmButtonText: "OK!",
                          });
                    }
                })
            }
    }

    const handlePasswordUpdateClick = () => {
        setUpdatingData(false)
        setUpdatingPassword(true)
    }

    const handlePasswordUpdateCancel = () => {
        setPasswordUpdateValues({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
        setUpdatingPassword(false)
        setUpdatingData(false)
    }
    
    return (
        <div className="mt-5 pt-3">
            <div className="card col-md-6 offset-md-3 mt-5 anagraphic-card shadow p-3 mb-5 bg-body rounded">
                <h3 className="text-center mt-2"> User details </h3>
                <div className="card-body">
                    <UserDetailsInput
                        updatingData={updatingData}
                        updatingPassword={updatingPassword}
                        userDetails={userDetails!}
                        setUserDetails={setUserDetails}
                        isUpdateValid={isUpdateValid!}
                        setIsUpdateValid={setIsUpdateValid}
                        passwordUpdateValues={passwordUpdateValues!}
                        setPasswordUpdateValues={setPasswordUpdateValues}
                        isPasswordUpdateValid={isPasswordUpdateValid}
                        setIsPasswordUpdateValid={setIsPasswordUpdateValid}
                    />
                    <div className="d-flex justify-content-center mt-3 position-absolute bottom-0 start-50 translate-middle-x w-100">
                        {
                            updatingData === false && updatingPassword === false ? (
                                <>
                                    <button
                                        className="btn btn-primary m-2 h-25 w-50"
                                        onClick={() => navigate("/employees")}
                                    >
                                        Go back
                                    </button>
                                    <button
                                        className="btn btn-success m-2 h-25 w-50"
                                        onClick={handleUpdateAnagraphic}
                                    >
                                        Update anagraphic
                                    </button>
                                    <button
                                        className="btn btn-warning m-2 h-25 w-50"
                                        onClick={handlePasswordUpdateClick}
                                    >
                                        Update password
                                    </button>
                                </>
                            ) :
                                (
                                    <>
                                        {
                                            updatingData === true && updatingPassword === false ? (
                                                <>
                                                    <button
                                                        className="btn btn-primary m-2 h-25 w-50"
                                                        onClick={handleUpdateConfirm}
                                                        disabled={isUpdateValid}
                                                    >
                                                        Confirm anagraphic update
                                                    </button>
                                                    <button
                                                        className="btn btn-success m-2 h-25 w-50"
                                                        onClick={handleCancelUpdateClick}
                                                    >
                                                        Cancel update
                                                    </button>
                                                    <button
                                                        className="btn btn-warning m-2 h-25 w-50"
                                                        onClick={handlePasswordUpdateClick}
                                                    >
                                                        Update password
                                                    </button>
                                                </>

                                            ) : (
                                                <>
                                                    <button
                                                        
                                                        className="btn btn-primary m-2 h-25 w-50"
                                                        onClick={handlePasswordUpdate}
                                                        disabled={isPasswordUpdateValid}
                                                    >
                                                        Confirm password update
                                                    </button>
                                                    <button
                                                        className="btn btn-success m-2 h-25 w-50"
                                                        onClick={handleUpdateAnagraphic}
                                                    >
                                                        Update anagraphic
                                                    </button>
                                                    <button
                                                        className="btn btn-warning m-2 h-25 w-50"
                                                        onClick={handlePasswordUpdateCancel}
                                                    >
                                                        Cancel update
                                                    </button>
                                                </>
                                            )
                                        }
                                    </>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserProfile;
