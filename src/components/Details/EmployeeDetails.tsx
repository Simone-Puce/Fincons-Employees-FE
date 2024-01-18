import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Employee from "../../models/EmployeeModel";
import EmployeeService from "../../services/EmployeeService";


const EmployeeDetails = () => {
    const [employee, setEmployee] = useState<Employee>()
    const navigate = useNavigate();
    const { id } = useParams();
    const idEmployee = parseInt(id!);
  
    useEffect(() => {
      EmployeeService.getEmployeeById(idEmployee).then((res) => {
        setEmployee(res.data.data);
      });
    },[idEmployee]);
  
    const goToHomepage = () => {
      navigate("/spinner");
    };
  
    return (
      <div className="mt-5 pt-3">
        <div className="card col-md-6 offset-md-3 mt-5">
          <h3 className="text-center mt-2"> View employee details </h3>
          <div className="card-body">
            <div className="row d-flex justify-content-center">
              <label className="mb-3 text-center">
                {" "}
                First name: {employee?.firstName}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Last name: {employee?.lastName}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Email: {employee?.email}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Birth date: {JSON.stringify(employee?.birthDate)}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Gender: {employee?.gender}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Hire date: {JSON.stringify(employee?.startDate)}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Contract end date: {JSON.stringify(employee?.endDate)}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Department: {employee?.department?.name}{" "}
              </label>
              <label className="mb-3 text-center">
                {" "}
                Position: {employee?.position?.name}{" "}
              </label>
            </div>
            <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={goToHomepage}
            >
              {" "}
              Go back to the employee list
            </button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EmployeeDetails;