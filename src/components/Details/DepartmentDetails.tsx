import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Department from "../../models/DepartmentModel";
import DepartmentService from "../../services/DepartmentService";

const DepartmentDetails = () => {
  const [department, setDepartment] = useState<Department>();
  const navigate = useNavigate();
  const { id } = useParams();
  const idDepartment = parseInt(id!);

  useEffect(() => {
    DepartmentService.getDepartmentById(idDepartment).then((res) => {
      setDepartment(res.data.data);
    });
  }, []);

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
              Department name: {department?.name}{" "}
            </label>

            <label className="mb-3 text-center">
              {" "}
              Department address: {department?.address}{" "}
            </label>

            <label className="mb-3 text-center">
              {" "}
              Department city: {department?.city}{" "}
            </label>
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
    </div>
  );
};

export default DepartmentDetails;
