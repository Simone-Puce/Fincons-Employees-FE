import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentService from "../../services/DepartmentService";
import Position from "../../models/PositionModel";
import PositionService from "../../services/PositionService";

const PositionDetails = () => {
  const [position, setPosition] = useState<Position>();
  const navigate = useNavigate();
  const { id } = useParams();
  const idPosition = parseInt(id!);

  useEffect(() => {
    PositionService.getPositionById(idPosition).then((res) => {
      setPosition(res.data.data);
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
              Position name: {position?.name}{" "}
            </label>

            <label className="mb-3 text-center">
              {" "}
              Position salary: {position?.salary}{" "}
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

export default PositionDetails;
