import { useCallback, useEffect, useState } from "react";
import UserDetailModels from "../../models/UserDetailsModel";
import Utils from "../../utils/Utils";
import PasswordUpdateModel from "../../models/PasswordUpdateModel";
import './Styles/FormStyles.css'
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
    const passwordSpecialCharacterCheck = RegExp(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/);
    const passwordUppercaseLetterCheck = RegExp(/[A-Z]/);

    const anagraphicFormValidation = useCallback(() =>{
        if (isFirstNameValid === false && isLastNameValid === false) {
            props.setIsUpdateValid(true)
        } else {
            props.setIsUpdateValid(false)
        }
    },[isFirstNameValid, isLastNameValid, props])

    useEffect(() => {
        anagraphicFormValidation()
    }, [anagraphicFormValidation, isFirstNameValid, isLastNameValid])


    const passwordFormValidation = useCallback(() => {
        if (isPasswordValid === true) {
            props.setIsPasswordUpdateValid(false)
        } else {
            props.setIsPasswordUpdateValid(true)
        }
    },[isPasswordValid, props])

    useEffect(() => {
        passwordFormValidation()
    }, [isPasswordValid, isLastNameValid, passwordFormValidation])
    
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
        <form className="anagraphic-form-style footer-manager">
            <div hidden={!props.updatingData} className="form-group w-75 mb-2">
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
            <div hidden={!props.updatingData} className="form-group w-75 mb-2">
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
            <div hidden={props.updatingData || props.updatingPassword} className="form-group w-75 mb-2 text-center">
            <span><strong> First name:</strong></span> {props.userDetails.firstName}
            </div>
            <div hidden={props.updatingData || props.updatingPassword} className="form-group w-75 mb-2 text-center">
            <span><strong> Last name:</strong></span> {props.userDetails.lastName}
            </div>
            <div hidden={props.updatingData || props.updatingPassword} className="form-group w-75 mb-2 text-center">
            <span><strong> Email:</strong></span> {props.userDetails.email}
            </div>
            <div hidden={!props.updatingPassword} className="form-group w-75 mb-2">
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
                        })
                    }}
                ></input>
            </div>
            <div hidden={!props.updatingPassword} className="form-group w-75 mb-2">
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
                    onFocus={() => setPasswordFocus(false)}
                    onBlur={() => setPasswordFocus(true)}
                ></input>
                <p hidden={passwordFocus}> Password must be 8 letters, contains an uppercase letter and a special character</p>
            </div>
            <div hidden={!props.updatingPassword} className="form-group w-75 mb-2">
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