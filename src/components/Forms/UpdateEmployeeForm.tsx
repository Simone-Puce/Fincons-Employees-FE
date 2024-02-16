import { useState, useEffect, Key, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Employee from "../../models/EmployeeModel";
import './Styles/FormStyles.css'
import Position from "../../models/PositionModel";
import Department from "../../models/DepartmentModel";
import { getDepartments } from "../../services/DepartmentService";
import { getEmployeeBySSN, updateEmployee } from "../../services/EmployeeService";
import { getPositions } from "../../services/PositionService";

const UpdateEmployeeForm = () => {
  const [employee, setEmployee] = useState<Employee>();
  const [departments, setDepartments] = useState<any>();
  const [positions, setPositions] = useState<any>();
  const { id } = useParams();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [firstNameValidator, setFirstNameValidator] = useState<boolean>(true)
  const [lastNameValidator, setLastNameValidator] = useState<boolean>(true)
  const [birthDateValidator, setBirthDateValidator] = useState<boolean>(true)
  const [emailValidator, setEmailValidator] = useState<boolean>(true)
  const [startDateValidator, setStartDateValidator] = useState<boolean>(true)
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      getEmployeeBySSN(id!).then((res) => {
        setEmployee(res.data);
      });
    }
    fetchEmployee()
  }, [id]);

  useEffect(() => {
    const fetchDepartments = async () => {
      getDepartments().then((res) => {
        setDepartments(res.data);
      })
    }
    const fetchPositions = async () => {
      getPositions().then((res) => {
        setPositions(res.data);
      })
    }
    fetchDepartments()
    fetchPositions()
  }, [])

  const UpdateEmployee = () => {
    updateEmployee(employee!);
    navigate("/employees");
  };

  const checkFirstName = (firstName: string) => {
    if (firstName.toString() === "") {
      setFirstNameValidator(false)
    } else {
      setFirstNameValidator(true)
    }
    checkSubmit()
  }

  const checkLastName = (lastName: string) => {
    if (lastName.toString() === "") {
      setLastNameValidator(false)
    } else {
      setLastNameValidator(true)
    }
    checkSubmit()
  }

  const checkEmail = (email: string) => {
    if (email.toString() === "") {
      setEmailValidator(false)
    } else {
      setEmailValidator(true)
    }
    checkSubmit()
  }

  const checkBirthDate = (birthDate: any) => {
    if (birthDate.toString() === "") {
      setBirthDateValidator(false)
    } else {
      setBirthDateValidator(true)
    }
    checkSubmit()
  }

  const checkStartDate = (startDate: any) => {
    if (startDate.toString() === "") {
      setStartDateValidator(false)
    } else {
      setStartDateValidator(true)
    }
    checkSubmit()
  }

  const checkSubmit = useCallback(() => {
    if (
      firstNameValidator === false ||
      lastNameValidator === false ||
      birthDateValidator === false ||
      emailValidator === false ||
      startDateValidator === false
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [birthDateValidator, emailValidator, firstNameValidator, lastNameValidator, startDateValidator])

  useEffect(() => {
    checkSubmit()
  }, [isButtonDisabled, firstNameValidator, lastNameValidator, birthDateValidator, emailValidator, startDateValidator, checkSubmit])

  const backToList = () => [navigate("/Employees")];

  return (
    <div className="createContainer mt-5 pt-5 footer-manager">
      <div className="container">
        <div className="row">
          <div className="card mb-5 col-md-6 offset-md-3 offset-md-3 create-card-style">
            <h3 className="text-center pt-2"> Update employee </h3>
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
                      checkFirstName(e.target.value)
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
                      checkLastName(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="gender"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
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
                    value={employee?.birthDate?.toString()}
                    className="form-control"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      checkBirthDate(e.target.value)
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
                        [e.target.name]: e.target.value
                      });
                      checkEmail(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>Start date</label>
                  <input
                    type="date"
                    placeholder="start date"
                    name="startDate"
                    value={employee?.startDate?.toString()}
                    className="form-control"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                      checkStartDate(e.target.value)
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label>End date</label>
                  <input
                    type="date"
                    placeholder="end date"
                    name="endDate"
                    value={employee?.endDate?.toString() || undefined}
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
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    {departments?.map((department: Department, index: Key) => {
                      return (
                        <option key={index} value={department.departmentCode}>{department.name}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Positions</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="position"
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    {positions?.map((position: Position, index: Key) => {
                      return (
                        <option key={index} value={position.positionCode}>{position.name}</option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <div className="d-flex justify-content-evenly w-50 mt-3">
                    <button
                      className="btn btn-save w-25 pointer-control"
                      onClick={UpdateEmployee}
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

export default UpdateEmployeeForm;