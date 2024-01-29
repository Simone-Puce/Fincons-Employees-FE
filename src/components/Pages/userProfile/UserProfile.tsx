import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegistrationService from "../../../services/LoginRegistrationService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UserDetailModels from "../../../models/UserDetailsModel";
import UserDetailsInput from "../../InputFormComponent/UserDetailsInput";

const UserProfile = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState<UserDetailModels>();
    const [updatingData, setUpdatingData] = useState<boolean>(true);
    const userValues = Cookies.get("jwt-token");
    const notValidInputs: Array<string> = ["id", "password"];

    useEffect(() => {
        const userEmail = jwtDecode(userValues!);
        LoginRegistrationService.getUserDetails(userEmail.sub).then((res) =>
            setUserDetails(res.data.data)
        );
    }, []);

    const handleUpdateClick = () => {
        setUpdatingData(!updatingData)
    }

    const handleUserDataUpdate = () => {

    }
    

    return (
        <div className="mt-5 pt-3">
            <div className="card col-md-6 offset-md-3 mt-5">
                <h3 className="text-center mt-2"> User details </h3>
                <div className="card-body">
                    <div className="row d-flex justify-content-center">
                        {userDetails === undefined ? (
                            <></>
                        ) : (
                            Object.entries(userDetails!).map((keyName, index) =>
                                notValidInputs.includes(keyName[0]) ? (
                                    <></>
                                ) : (
                                    <UserDetailsInput data={keyName} updatingData={updatingData} />
                                )
                            )
                        )}
                        <div className="d-flex justify-content-center">
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
                                            //onClick={handleUserUpdate}
                                        >
                                            Confirm update
                                        </button>
                                        <button
                                            className="btn btn-success m-2"
                                            onClick={handleUpdateClick}
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
        </div>
    );
};
export default UserProfile;
