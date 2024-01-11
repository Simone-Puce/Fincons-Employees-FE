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
    EmployeeService.getById(idEmployee).then((res) => {
      setEmployee(res.data);
    });
  });

  const goToHomepage = () => {
    navigate("/employees");
  };

  return (
    <div className="mt-5 pt-3">
      <div className="card col-md-6 offset-md-3 mt-5">
        <h3 className="text-center"> View Employee Details </h3>
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <label className="mb-3 text-center">
              {" "}
              Employee first name: {employee.firstName}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee last name: {employee.lastName}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee email: {employee.email}{" "}
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
};

export default ViewEmployeeComponent;
