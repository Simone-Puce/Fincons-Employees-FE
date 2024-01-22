/* eslint-disable react-hooks/exhaustive-deps */
import { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Employee from "../../models/EmployeeModel";
import Department from "../../models/DepartmentModel";
import DepartmentService from "../../services/DepartmentService";
import EmployeeService from "../../services/EmployeeService";
import PositionService from "../../services/PositionService";
import './Styles/FormStyles.css'
import Utils from "../../utils/Utils";


const CreateEmployeeForm = () => {
  const [employee, setEmployee] = useState<Employee>();
  const [departments, setDepartments] = useState<any>();
  const [positions, setPositions] = useState<any>();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [firstNameValidator, setFirstNameValidator] = useState<boolean>(false)
  const [lastNameValidator, setLastNameValidator] = useState<boolean>(false)
  const [birthDateValidator, setBirthDateValidator] = useState<boolean>(false)
  const [genderValidator, setGenderValidator] = useState<boolean>(false)
  const [emailValidator, setEmailValidator] = useState<boolean>(false)
  const [startDateValidator, setStartDateValidator] = useState<boolean>(false)
  const [departmentValidator, setDepartmentValidator] = useState<boolean>(false)
  const [positionValidator, setPositionValidator] = useState<boolean>(false)
  const navigate = useNavigate();

  
  useEffect(() => {
    checkSubmit()
  }, [
    isButtonDisabled,
    firstNameValidator,
    lastNameValidator,
    birthDateValidator,
    emailValidator,
    startDateValidator,
    genderValidator,
    departmentValidator,
    positionValidator
  ]
  )

  useEffect(() => {
    DepartmentService.getDepartments().then((res) => {
      setDepartments(res.data);
    });
    PositionService.getPositions().then((res) => {
      setPositions(res.data);
    });
  }, []);

  const checkSubmit = () => {
    if (
      firstNameValidator === false ||
      lastNameValidator === false ||
      birthDateValidator === false ||
      emailValidator === false ||
      startDateValidator === false ||
      genderValidator === false ||
      departmentValidator === false ||
      positionValidator === false
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const saveOrUpdateEmployee = () => {
    EmployeeService.createEmployee(employee);
    navigate("/spinner");
  };

  const backToList = () => [navigate("/Employees")];

  return (
    <div className="createContainer mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center"> Create employee </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>First name</label>
                  <input
                    placeholder="First name"
                    name="firstName"
                    className="form-control"
                    value={employee?.firstName}
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setFirstNameValidator(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Last name</label>
                  <input
                    placeholder="Last name"
                    name="lastName"
                    className="form-control"
                    value={employee?.lastName}
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setLastNameValidator(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={employee?.gender}
                    name="gender"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setGenderValidator(Utils.valideField(e.target.value))
                    }}
                  >
                    <option value="select your gender">Select your gender</option>
                    <option value="male"> Male </option>
                    <option value="female"> Female </option>
                    <option value="others"> Other </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Birth date</label>
                  <input
                    type="date"
                    placeholder="birth name"
                    name="birthDate"
                    className="form-control"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setBirthDateValidator(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    placeholder="email"
                    name="email"
                    className="form-control"
                    value={employee?.email}
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setEmailValidator(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Start date</label>
                  <input
                    type="date"
                    placeholder="start date"
                    name="startDate"
                    className="form-control"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setStartDateValidator(Utils.valideField(e.target.value))
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>End date</label>
                  <input
                    type="date"
                    placeholder="end date"
                    name="endDate"
                    className="form-control"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <select
                    name="department"
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={"Select the department"}
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setDepartmentValidator(Utils.valideField(e.target.value))
                    }}
                  >
                    <option defaultValue="select the department">Select the department</option>
                    {departments?.data?.map((department: Department,index: Key) => {
                      return (
                        <option key={index} value={department.id}>{department.name}</option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Positions</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={"Select the position"}
                    name="position"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      setPositionValidator(Utils.valideField(e.target.value))
                    }}
                  >
                    <option defaultValue="select the position">Select the position</option>
                    {positions?.data?.map((position: Department, index: Key) => {
                      return (
                        <option key={index} value={position.id}>{position.name}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-success"
                    onClick={saveOrUpdateEmployee}
                    disabled={isButtonDisabled}
                    title={isButtonDisabled ? "some fields are not valid, please check the values" : ""}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "10px" }}
                    onClick={backToList}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
