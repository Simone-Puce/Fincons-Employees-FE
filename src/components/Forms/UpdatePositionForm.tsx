import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Position from "../../models/PositionModel";
import PositionService from "../../services/PositionService";
import "./Styles/FormStyles.css"

const UpdatePositionForm = () => {
  const [position, setPosition] = useState<Position>();
  const { id } = useParams();
  const idPosition = parseInt(id!);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [salaryValueValid, setSalaryValueValid] = useState<boolean>(true)
  const [positionNameValid, setPositionNameValid] = useState<boolean>(true)


  const navigate = useNavigate();

  useEffect(() => {
    PositionService.getPositionById(idPosition).then((res) => {
      setPosition(res.data.data);
    });
  }, [idPosition]);

  useEffect(() => {
    checkSubmit()
  }, [isButtonDisabled, salaryValueValid, position])

  const UpdatePosition = () => {
    PositionService.updatePosition(idPosition, position!);
    navigate("/spinner");
  };

  const checkPositionNameValue = (positionNameValue: string) => {
    if (positionNameValue.toString() === "") {
      setPositionNameValid(false)
    } else {
      setPositionNameValid(true)
    }
    checkSubmit()
  }

  const checkSalaryValue = (salary: any) => {
    if (salary.toString() === "") {
      setSalaryValueValid(false)
    } else {
      setSalaryValueValid(true)
    }
    checkSubmit()
  }

  const checkSubmit = () => {
    if (salaryValueValid === false || positionNameValid === false) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const backToList = () => [navigate("/Employees")];

  return (
    <div className="createContainer mt-5 pt-5 footer-manager">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 create-card-style">
            <h3 className="text-center pt-2"> Update position </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Position name</label>
                  <input
                    placeholder="First name"
                    name="name"
                    className="form-control"
                    value={position?.name}
                    onChange={(e) => {
                      setPosition({
                        ...position!,
                        [e.target.name]: e.target.value,
                      });
                      checkPositionNameValue(e.target.value)
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Salary</label>
                  <input
                    placeholder="Last name"
                    type="number"
                    name="salary"
                    className="form-control"
                    value={position?.salary}
                    onChange={(e) => {
                      setPosition({
                        ...position!,
                        [e.target.name]: e.target.value,
                      })
                      checkSalaryValue(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <div className="d-flex justify-content-evenly w-50 mt-3">
                    <button
                      className="btn btn-save w-25 pointer-control"
                      onClick={UpdatePosition}
                      disabled={isButtonDisabled}
                      title={isButtonDisabled ? "some fields are not valid, please check the values" : ""}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-save w-25"
                      onClick={backToList}
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
};

export default UpdatePositionForm;
