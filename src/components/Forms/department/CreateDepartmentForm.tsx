import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Department from "../../../models/DepartmentModel";
import Utils from "../../../utils/Utils";
import './Styles/FormStyles.css'
import { createDepartment } from "../../../services/DepartmentService";

const CreateDepartmentForm = () => {
  const [department, setDepartment] = useState<Department>();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [departmentNameValid, setDepartmentNameValid] = useState<boolean>(false)
  const [departmentCityValid, setDepartmentCityValid] = useState<boolean>(false)
  const [departmentAddressValid, setDepartmentAddressValid] = useState<boolean>(false)
  const navigate = useNavigate();

  const goBackToList = () => {
    navigate("/employees");
  };

  const checkSubmit = useCallback(() => {
    if (
      departmentAddressValid === false ||
      departmentCityValid === false ||
      departmentNameValid === false
    ) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  },[departmentAddressValid, departmentCityValid, departmentNameValid])

  useEffect(() => {
    checkSubmit()
  }, [isButtonDisabled, departmentAddressValid, departmentNameValid, departmentCityValid, checkSubmit])

  const saveDepartment = () => {
    createDepartment(department!);
    navigate("/employees");
  };

  return (
    <div className="createContainer mt-5 pt-5 footer-manager">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 create-card-style">
            <h3 className="text-center pt-2"> Create Department </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    placeholder="Department"
                    name="name"
                    className="form-control"
                    value={department?.name}
                    onChange={(e) => {
                      setDepartment({
                        ...department!,
                        [e.target.name]: e.target.value,
                      });
                      setDepartmentNameValid(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    placeholder="Address"
                    name="address"
                    className="form-control"
                    value={department?.address}
                    onChange={(e) => {
                      setDepartment({
                        ...department!,
                        [e.target.name]: e.target.value,
                      });
                      setDepartmentAddressValid(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    placeholder="City"
                    name="city"
                    className="form-control"
                    value={department?.city}
                    onChange={(e) => {
                      setDepartment({
                        ...department!,
                        [e.target.name]: e.target.value,
                      });
                      setDepartmentCityValid(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>
                <div className="form-group d-flex justify-content-center">
                <div className="d-flex justify-content-evenly w-50 mt-3">
                <button
                  className="btn btn-save w-25"
                  onClick={saveDepartment}
                  disabled={isButtonDisabled}
                  title={isButtonDisabled ? "some fields are not valid, please check the values" : ""}
                >
                  Save
                </button>
                <button
                  className="btn btn-cancel w-25 ml-2"
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
};

export default CreateDepartmentForm;
