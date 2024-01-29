import UserDetailModels from "../../models/UserDetailsModel";

interface Props {
    updatingData : boolean,
    userDetails: UserDetailModels
    setUserDetails: React.Dispatch<React.SetStateAction<UserDetailModels | undefined>>
}

const UserDetailsInput = (props: Props) => {

    return (
        <form>
            <div className="form-group">
                <label>First name</label>
                <input
                    placeholder={props.userDetails?.firstName}
                    name="firstName"
                    className="form-control"
                    value={props.userDetails?.firstName}
                    disabled={props.updatingData}
                    onChange={(e) => {
                        props.setUserDetails({
                          ...props.userDetails!,
                          [e.target.name]: e.target.value,
                        });
                      }}
                ></input>
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input
                    placeholder={props.userDetails?.lastName}
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={props.userDetails?.lastName}
                    disabled={props.updatingData}
                    onChange={(e) => {
                        props.setUserDetails({
                          ...props.userDetails!,
                          [e.target.name]: e.target.value,
                        });
                      }}
                ></input>
            </div>

            <div hidden={!props.updatingData} className="form-group">
                <label>Email </label>
                <input
                    placeholder={props.userDetails?.email}
                    type="text"
                    name="salary"
                    className="form-control"
                    value={props.userDetails?.email}
                    disabled={true}
                    hidden={!props.updatingData}
                ></input>
            </div>


            <div hidden={props.updatingData} className="form-group">
                <label>Password </label>
                <input
                    placeholder="Insert new password"
                    type="password"
                    name="password"
                    className="form-control"
                    value=""
                    disabled={props.updatingData}
                    onChange={(e) => {
                        props.setUserDetails({
                          ...props.userDetails!,
                          [e.target.name]: e.target.value,
                        });
                      }}
                ></input>
            </div>

        </form>
    )

}
export default UserDetailsInput