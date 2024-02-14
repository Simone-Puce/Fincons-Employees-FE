import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Employee from "../../models/EmployeeModel";
import CertificateComponent from "../Pages/Certificate/CertificateComponentModal";
import './Styles/Details.css'
import Utils from "../../utils/Utils";
import { getEmployeeBySSN } from "../../services/EmployeeService";

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState<Employee>()
  const navigate = useNavigate();
  const { SSN } = useParams();

  useEffect(() => {
    getEmployeeBySSN(SSN!).then((res) => {
      setEmployee(res.data.data);
    });
  }, [SSN])

  const goToHomepage = () => {
    navigate("/employees")
  };

  return (
    <div className="mt-5 pt-3 pb-5 footer-manager">
      <div className="card col-md-6 offset-md-3 mt-5 card-style">
        <h3 className="text-center mt-2"> View employee details </h3>
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <label className="mb-3 text-center">
              <span><strong>First name:</strong></span> {Utils.capitalizeFirstLetter(employee?.firstName)}
            </label>
            <label className="mb-3 text-center">
              <span><strong>Last name:</strong></span> {Utils.capitalizeFirstLetter(employee?.lastName)}
            </label>
            <label className="mb-3 text-center">
              <span><strong>Email:</strong></span> {employee?.email}
            </label>
            <label className="mb-3 text-center">
              <span><strong>Birth date:</strong></span> {JSON.stringify(employee?.birthDate)}
            </label>
            <label className="mb-3 text-center">
              <span><strong>Gender:</strong></span> {employee?.gender}
            </label>
            <label className="mb-3 text-center">
            <span><strong>Start date:</strong></span>: {JSON.stringify(employee?.startDate)}
            </label>
            <label className="mb-3 text-center">
              <span><strong>Contract end date:</strong></span> {JSON.stringify(employee?.endDate)}
            </label>
            <label className="mb-3 text-center">
            <span><strong>Department:</strong></span> {Utils.capitalizeFirstLetter(employee?.department?.name)}
            </label>
            <label className="mb-3 text-center">
            <span><strong>Position:</strong></span> {Utils.capitalizeFirstLetter(employee?.position?.name)}
            </label>
          </div>
          <div>
            <CertificateComponent SSN={SSN!} />
          </div>
          <div className="d-flex justify-content-center pt-2">
            <button
              type="button"
              className="btn btn-back"
              onClick={goToHomepage}
            >
              <i className="bi bi-caret-left-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;