interface PasswordUpdateModel {
    oldPassword: string,
    newPassword?: string,
    confirmPassword?: string
}

export default PasswordUpdateModel;