import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentService from "../../services/DepartmentService";
import Department from "../../models/DepartmentModel";
import "./Styles/FormStyles.css"

const UpdateDepartmentForm = () => {
  const [department, setDepartment] = useState<Department>();
  const { id } = useParams();
  const idDepartment = parseInt(id!);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [departmentNameValid, setDepartmentNameValid] = useState<boolean>(true)
  const [departmentCityValid, setDepartmentCityValid] = useState<boolean>(true)
  const [departmentAddressValid, setDepartmentAddressValid] = useState<boolean>(true)
  const navigate = useNavigate();

  useEffect(() => {
    DepartmentService.getDepartmentById(idDepartment).then((res) => {
      setDepartment(res.data.data);
    });
  }, [idDepartment]);

  useEffect(() => {
    checkSubmit()
  }, [
    isButtonDisabled,
    departmentAddressValid,
    departmentNameValid,
    departmentCityValid
  ])

  const checkName = (nameValue: string) => {
    if (nameValue.toString() === "") {
      setDepartmentNameValid(false)
    } else {
      setDepartmentNameValid(true)
    }
    checkSubmit()
  }

  const checkAddress = (addressValue: string) => {
    if (addressValue.toString() === "") {
      setDepartmentAddressValid(false)
    } else {
      setDepartmentAddressValid(true)
    }
    checkSubmit()
  }

  const checkCity = (cityValue: string) => {
    if (cityValue.toString() === "") {
      setDepartmentCityValid(false)
    } else {
      setDepartmentCityValid(true)
    }
    checkSubmit()
  }

  const checkSubmit = () => {
    if (
      departmentAddressValid === false ||
      departmentCityValid === false ||
      departmentNameValid === false
    ) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }

  const UpdatePosition = () => {
    DepartmentService.updateDepartment(idDepartment, department!);
    navigate("/employees");
  };

  const backToList = () => [navigate("/Employees")];

  return (
    <div className="createContainer mt-5 pt-5 footer-manager">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 create-card-style">
            <h3 className="text-center pt-2"> Update department </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Department name</label>
                  <input
                    placeholder="First name"
                    name="name"
                    className="form-control"
                    value={department?.name}
                    onChange={(e) => {
                      setDepartment({
                        ...department!,
                        [e.target.name]: e.target.value,
                      });
                      checkName(e.target.value)
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
                      checkAddress(e.target.value)
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
                      checkCity(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <div className="d-flex justify-content-evenly w-50 mt-3">
                    <button className="btn btn-save w-25 pointer-control"
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

export default UpdateDepartmentForm;
