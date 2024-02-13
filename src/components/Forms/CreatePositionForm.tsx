import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Position from "../../models/PositionModel";
import PositionService from "../../services/PositionService";
import Utils from "../../utils/Utils";
import "./Styles/FormStyles.css"

const CreatePositionForm = () => {
  const [position, setPosition] = useState<Position>();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [salaryValueValid, setSalaryValueValid] = useState<boolean>(false)
  const [positionNameValid, setPositionNameValid] = useState<boolean>(false)

  const checkSubmit = useCallback(() => {
    if (salaryValueValid === false || positionNameValid === false) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  },[positionNameValid, salaryValueValid])

  useEffect(() => {
    checkSubmit()
  }, [isButtonDisabled, salaryValueValid, position, checkSubmit])

  const navigate = useNavigate();

  const goBackToList = () => {
    navigate("/employees");
  };

  const savePosition = () => {
    PositionService.createPosition(position!);
    navigate("/employees");
  };

  return (
    <div className="createContainer mt-5 pt-5 footer-manager">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 create-card-style">
            <h3 className="text-center pt-2"> Create position </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    placeholder="Position"
                    name="name"
                    className="form-control"
                    value={position?.name}
                    onChange={(e) => {
                      setPosition({
                        ...position!,
                        [e.target.name]: e.target.value,
                      });
                      setPositionNameValid(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Salary</label>
                  <input
                    type="number"
                    placeholder="Salary"
                    name="salary"
                    className="form-control"
                    value={position?.salary}
                    onChange={(e) => {
                      setPosition({
                        ...position!,
                        [e.target.name]: e.target.value,
                      });
                      setSalaryValueValid(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <div className="d-flex justify-content-evenly w-50 mt-3">
                    <button
                      className="btn btn-save w-25 pointer-control"
                      onClick={savePosition}
                      disabled={isButtonDisabled}
                      title={isButtonDisabled ? "some fields are not valid, please check the values" : ""}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-save w-25"
                      onClick={goBackToList}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePositionForm;