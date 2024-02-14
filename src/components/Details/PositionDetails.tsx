import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Position from "../../models/PositionModel";
import './Styles/Details.css'
import { getPositionByPositionCode } from "../../services/PositionService";

const PositionDetails = () => {
  const [position, setPosition] = useState<Position>();
  const navigate = useNavigate();
  const { positionCode } = useParams();

  useEffect(() => {
    getPositionByPositionCode(positionCode!).then((res) => {
      setPosition(res.data.data)
    });
  }, [positionCode])

  const goToHomepage = () => {
    navigate("/employees");
  };

  return (
    <div className="mt-5 pt-3 footer-manager">
      <div className="card col-md-6 offset-md-3 mt-5 card-style">
        <h3 className="text-center mt-2"> View position details </h3>
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <label className="mb-3 text-center">
              <span><strong>Position name:</strong></span> {position?.name}
            </label>
            <label className="mb-3 text-center">
              <span><strong>Position salary:</strong></span> {position?.salary}
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

export default PositionDetails;
