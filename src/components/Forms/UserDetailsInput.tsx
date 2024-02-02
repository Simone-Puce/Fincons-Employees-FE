/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import UserDetailModels from "../../models/UserDetailsModel";
import Utils from "../../utils/Utils";
import PasswordUpdateModel from "../../models/PasswordUpdateModel";

interface Props {
    updatingData: boolean,
    updatingPassword: boolean,
    userDetails: UserDetailModels
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetailModels | undefined>>
    isUpdateValid: boolean,
    setIsUpdateValid: React.Dispatch<React.SetStateAction<boolean>>
    passwordUpdateValues: PasswordUpdateModel
    setPasswordUpdateValues: React.Dispatch<React.SetStateAction<PasswordUpdateModel>>
    isPasswordUpdateValid: boolean
    setIsPasswordUpdateValid: React.Dispatch<React.SetStateAction<boolean>>
}

const UserDetailsInput = (props: Props) => {
    const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(true)
    const [isLastNameValid, setIsLastNameValid] = useState<boolean>(true)
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)
    const [passwordFocus, setPasswordFocus] = useState<boolean>(true)
    const passwordSpecialCharacterCheck = RegExp(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/);
    const passwordUppercaseLetterCheck = RegExp(/[A-Z]/);

    useEffect(() => {
        anagraphicFormValidation()
    }, [
        isFirstNameValid,
        isLastNameValid,
    ])

    useEffect(() => {
        passwordFormValidation()
    }, [
        isPasswordValid,
        isLastNameValid
    ])

    const anagraphicFormValidation = () => {
        if (isFirstNameValid === false && isLastNameValid === false) {
            props.setIsUpdateValid(true)
        } else {
            props.setIsUpdateValid(false)
        }
    }

    const passwordFormValidation = () => {
        if (isPasswordValid === true) {
            props.setIsPasswordUpdateValid(false)
        } else {
            props.setIsPasswordUpdateValid(true)
        }
    }

    const passwordValidator = (password: string) => {
        let passwordLengthCheck = false;
        let hasUpperCase = false;
        let hasSpecialCharacter = false;
        if (password.length >= 8) {
            passwordLengthCheck = true;
        } else {
            passwordLengthCheck = false;
        }
        if (passwordUppercaseLetterCheck.test(password)) {
            hasUpperCase = true;
        } else {
            hasUpperCase = false;
        }
        if (passwordSpecialCharacterCheck.test(password)) {
            hasSpecialCharacter = true;
        } else {
            hasSpecialCharacter = false;
        }
        if (
            passwordLengthCheck === true &&
            hasUpperCase === true &&
            hasSpecialCharacter === true &&
            password !== ""
        ) {
            setIsPasswordValid(true)
        } else {
            setIsPasswordValid(false)
        }
        passwordFormValidation()
    }

    return (
        <form autoComplete="off">
            <div hidden={props.updatingPassword} className="form-group">
                <label>First name</label>
                <input
                    placeholder={props.userDetails?.firstName}
                    name="firstName"
                    className="form-control"
                    value={props.userDetails?.firstName}
                    disabled={!props.updatingData}
                    onChange={(e) => {
                        props.setUserDetails({
                            ...props.userDetails!,
                            [e.target.name]: e.target.value,
                        });
                        setIsFirstNameValid(Utils.valideField(e.target.value))
                    }}
                ></input>
            </div>
            <div hidden={props.updatingPassword} className="form-group">
                <label>Last name</label>
                <input
                    placeholder={props.userDetails?.lastName}
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={props.userDetails?.lastName}
                    disabled={!props.updatingData}
                    onChange={(e) => {
                        props.setUserDetails({
                            ...props.userDetails!,
                            [e.target.name]: e.target.value,
                        });
                        setIsLastNameValid(Utils.valideField(e.target.value))
                    }}
                ></input>
            </div>
            <div hidden={props.updatingData || props.updatingPassword} className="form-group">
                <label>Email </label>
                <input
                    placeholder={props.userDetails?.email}
                    type="text"
                    name="email"
                    className="form-control"
                    value={props.userDetails?.email}
                    disabled={true}
                    hidden={props.updatingData}
                ></input>
            </div>
            <div hidden={!props.updatingPassword} className="form-group">
                <label> Old password </label>
                <input
                    value={props.passwordUpdateValues.oldPassword}
                    placeholder="Insert the old password"
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    onChange={(e) => {
                        props.setPasswordUpdateValues({
                            ...props.passwordUpdateValues!,
                            [e.target.name]: e.target.value,
                        });
                    }}
                ></input>
            </div>
            <div hidden={!props.updatingPassword} className="form-group">
                <label> New password </label>
                <input
                    value={props.passwordUpdateValues.newPassword}
                    placeholder="Insert the new password"
                    type="password"
                    name="newPassword"
                    className="form-control disable"
                    autoComplete="disabled"
                    onChange={(e) => {
                        props.setPasswordUpdateValues({
                            ...props.passwordUpdateValues!,
                            [e.target.name]: e.target.value,
                        });
                        passwordValidator(e.target.value)
                    }}
                    onFocus={()=>setPasswordFocus(false)}
                    onBlur={()=>setPasswordFocus(true)}
                ></input>
                <p hidden={passwordFocus}> Password must be 8 letters, contains an uppercase letter and a special character</p>
            </div>
            <div hidden={!props.updatingPassword} className="form-group">
                <label> Confirm new password </label>
                <input
                    value={props.passwordUpdateValues.confirmPassword}
                    placeholder="Confirm the new password"
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    autoComplete="disabled"
                    onChange={(e) => {
                        props.setPasswordUpdateValues({
                            ...props.passwordUpdateValues!,
                            [e.target.name]: e.target.value,
                        });
                    }}
                ></input>
            </div>
        </form>
    )

}
export default UserDetailsInput