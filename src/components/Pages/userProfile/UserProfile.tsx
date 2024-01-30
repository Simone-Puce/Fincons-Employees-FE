import { useNavigate } from "react-router-dom";
import UserDetailsInput from "../../Forms/UserDetailsInput";
import { useEffect, useState } from "react";
import UserDetailModels from "../../../models/UserDetailsModel";
import Cookies from "js-cookie";
import LoginRegistrationService from "../../../services/LoginRegistrationService";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
    const navigate = useNavigate();
    const [updatingData, setUpdatingData] = useState<boolean>(true);
    const [userDetails, setUserDetails] = useState<UserDetailModels>()
    const jwt = Cookies.get("jwt-token")

    useEffect(() => {
        const subJWT = jwtDecode(jwt!)
        LoginRegistrationService.getUserDetails(subJWT.sub).then((res) => {
            setUserDetails(res.data.data)
        })
    }, [updatingData])

    const handleUpdateClick = () => {
        setUpdatingData(!updatingData)
    }

    const handleCancelUpdateClick = () => {
        setUpdatingData(!updatingData)
    }

    const handleUpdateConfirm = () => {
        LoginRegistrationService.updateUserData(userDetails!)
        setUpdatingData(!updatingData)
    }

    return (
        <div className="mt-5 pt-3">
            <div className="card col-md-6 offset-md-3 mt-5">
                <h3 className="text-center mt-2"> User details </h3>
                <div className="card-body">
                    <UserDetailsInput
                        updatingData={updatingData}
                        userDetails={userDetails!}
                        setUserDetails={setUserDetails}
                    />
                    <div className="d-flex justify-content-center mt-3">
                        {
                            updatingData ? (
                                <>
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={() => navigate("/employees")}
                                    >
                                        Navigate to employee list
                                    </button>
                                    <button
                                        className="btn btn-success m-2"
                                        onClick={handleUpdateClick}
                                    >
                                        Update user information
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-primary m-2"
                                        onClick={handleUpdateConfirm}
                                    >
                                        Confirm update
                                    </button>
                                    <button
                                        className="btn btn-success m-2"
                                        onClick={handleCancelUpdateClick}
                                    >
                                        Cancel update
                                    </button>
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
