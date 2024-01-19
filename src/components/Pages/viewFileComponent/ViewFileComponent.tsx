import { Link, useNavigate, useParams } from "react-router-dom";
import Employee from "../../../models/EmployeeModel";
import { useState } from "react";

const ViewFileComponent = () => {

    const [employee, setEmployee] = useState<Employee>()
    const [tableElementId, setTableElementId] = useState<string>()
    const navigate = useNavigate();
    const { id } = useParams();
    const idEmployee = parseInt(id!);

    const goToFileListEmp = () => {
        navigate("/file/list/" + idEmployee);
    };



    return (
        <div>
            <div className="mt-5 pt-3">
                <div className="card col-md-6 offset-md-3 mt-5"></div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={goToFileListEmp}>
                    {" "}
                    Go back to the employee list
                </button>
            </div>

            <Link to={`/file/list/${employee?.id}`}><button type="button" className="btn btn-secondary">Go back to {employee?.firstName}'s file list</button></Link>

        </div>
    )
}
export default ViewFileComponent