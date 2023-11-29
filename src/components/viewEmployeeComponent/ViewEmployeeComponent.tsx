import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import EmployeeService from "../../services/EmployeeService";

const ViewEmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const idEmployee = parseInt(id!);

  useEffect(() => {
    EmployeeService.getEmployeesById(idEmployee).then((res) => {
      setEmployee(res.data);
    });
  });

  const goToHomepage = () => {
    navigate("/employees");
  };

  return (
    <div>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View Employee Details </h3>
        <div className="card-body">
          <div className="row">
            <label> Employee first name: {employee.firstName} </label>
            <label> Employee last name: {employee.lastName} </label>
            <label> Employee email: {employee.email} </label>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={goToHomepage}
          >
            {" "} Go back to the employee list
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
