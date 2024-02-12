import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Department from "../../models/DepartmentModel";
import DepartmentService from "../../services/DepartmentService";
import './Styles/Details.css'

const DepartmentDetails = () => {
  const [department, setDepartment] = useState<Department>();
  const navigate = useNavigate();
  const { id } = useParams();
  const idDepartment = parseInt(id!);

  useEffect(() => {
    DepartmentService.getDepartmentById(idDepartment).then((res) => {
      setDepartment(res.data.data);
    });
  }, [idDepartment]);

  const goToHomepage = () => {
    navigate("/employees");
  };

  return (
    <div className="mt-5 pt-3 footer-manager">
      <div className="card col-md-6 offset-md-3 mt-5 card-style">
        <h3 className="text-center mt-2"> View department details </h3>
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <label className="mb-3 text-center">
              <span><strong>Name:</strong></span> {department?.name}
            </label>
            <label className="mb-3 text-center">
            <span><strong>Address:</strong></span> {department?.address}
            </label>
            <label className="mb-3 text-center">
            <span><strong>City:</strong></span> {department?.city}{" "}
            </label>
            <div className="d-flex justify-content-center">
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
    </div>
  );
};

export default DepartmentDetails;
