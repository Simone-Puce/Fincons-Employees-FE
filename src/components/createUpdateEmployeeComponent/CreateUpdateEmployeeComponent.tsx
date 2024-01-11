import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import Department from "../../models/DepartmentModel";
import DepartmentService from "../../services/DepartmentService";
import PositionService from "../../services/PositionService";
import Employee from "../../models/EmployeeModel";

const CreateUpdateEmployeeComponent = () => {
  const [employee, setEmployee] = useState<Employee>();
  const [departments, setDepartments] = useState<any>();
  const [positions, setPositions] = useState<any>();
  const [formNames, setFormNames] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    DepartmentService.getDepartments().then((res) => {
      setDepartments(res.data);
    });
    PositionService.getPositions().then((res)=>{
        setPositions(res.data)
    })
    setFormNames("Add");
  }, []);

  const saveOrUpdateEmployee = () => {
    let departmentForEmployee;
    DepartmentService.getDepartmentsById(employee?.department?.id).then((res)=>{
        departmentForEmployee=res.data
    })
    EmployeeService.createEmployee(
        {
           firstName: employee?.firstName,
           lastName: employee?.lastName,
           gender: employee?.gender,
           birthDate: employee?.birthDate,
           email: employee?.email,
           startDate: employee?.startDate,
           endDate: employee?.endDate,
           department: departmentForEmployee,
           position: employee?.position
        }
    );
    navigate("/employees");
  };

  const backToList = () => [navigate("/Employees")];

  return (
    <div className="createContainer mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center"> {formNames} employee </h3>
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
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Gender</label>
                  <input
                    placeholder="gender"
                    name="gender"
                    className="form-control"
                    value={employee?.gender}
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Birth date</label>
                  <input
                    type="date"
                    placeholder="birth name"
                    name="birthDate"
                    className="form-control"
                    //value={employee?.birthDate}
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
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
                    //value={employee?.birthDate}
                    onChange={(e) => {
                      setEmployee({
                        ...employee!,
                        [e.target.name]: e.target.value,
                      });
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
                    //value={employee?.birthDate}
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
                    onChange={(e)=>{
                        setEmployee({
                            ...employee!,
                            [e.target.name]: e.target.value
                        })
                    }}
                  >
                    <option selected>Select the department</option>
                    {departments?.data?.map((department: Department) => {
                      return <option value={department.id}>{department.name}</option>;
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Positions</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="position"
                    onChange={(e)=>{
                        setEmployee({
                            ...employee!,
                            [e.target.name]: e.target.value
                        })
                    }}
                  >
                    <option selected>Select the position</option>
                    {positions?.data?.map((position: Department) => {
                      return <option value={position.id}>{position.name}</option>;
                    })}
                  </select>
                </div>

                <button
                  className="btn btn-success"
                  onClick={saveOrUpdateEmployee}
                >
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={backToList}
                >
                  {" "}
                  Cancel{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateEmployeeComponent;
