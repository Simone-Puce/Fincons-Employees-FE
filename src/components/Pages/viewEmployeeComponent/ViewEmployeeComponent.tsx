import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import EmployeeService from "../../../services/EmployeeService";
import Employee from "../../../models/EmployeeModel";

const ViewEmployeeComponent = () => {
  const [employee, setEmployee] = useState<Employee>()
  const navigate = useNavigate();
  const { id } = useParams();
  const idEmployee = parseInt(id!);

  useEffect(() => {
    EmployeeService.getEmployeeById(idEmployee).then((res) => {
      setEmployee(res.data.data);
    });
  },[]);

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
              Employee first name: {employee?.firstName}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee last name: {employee?.lastName}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee email: {employee?.email}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee birth date: {JSON.stringify(employee?.birthDate)}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee gender: {employee?.gender}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee hire date: {JSON.stringify(employee?.startDate)}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee contract end date: {JSON.stringify(employee?.endDate)}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee department: {employee?.department?.name}{" "}
            </label>
            <label className="mb-3 text-center">
              {" "}
              Employee position: {employee?.position?.name}{" "}
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
