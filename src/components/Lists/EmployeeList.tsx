import { useNavigate } from "react-router-dom";
import TableHeadComponent from "../Pages/tableHeadComponent/TableHeadComponent";
import TableElementComponent from "../Pages/tableElementComponent/TableElementComponent";
import { useEffect, useState } from "react";
import './style/EmployeeList.css'
import { getDepartments } from "../../services/DepartmentService";
import { getPositions } from "../../services/PositionService";
import Employee from "../../models/EmployeeModel";
import { getEmployees } from "../../services/EmployeeService";

interface Props {
  toDisplay: string;
}

const EmployeeList = (props: Props) => {
  const [disabledCreation, setDisabledCreation] = useState<boolean>(false)
  const [employees, setEmployees] = useState<Employee[]>()
  const navigate = useNavigate()

  useEffect(() => {
    getDepartments().then((res) => {
      if (res.data.length === 0) {
        setDisabledCreation(true)
      }
    })
    getPositions().then((res) => {
      if (res.data.length === 0) {
        setDisabledCreation(true)
      }
    })
  }, [props.toDisplay])

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees()
      setEmployees(response.data)
    }
    fetchEmployees()
  }, [])

  const goToAddForm = () => {
    navigate("/add-employee")
  }

  return (
    <div className="containerList mt-1 pt-1 pb-4">
      <div className="row mt-4 mb-3">
        <div className="d-flex justify-content-center filterDiv">
          <button className="btn rounded-pill btn-add text-white create-button w-25" title={disabledCreation ? "You need at least one department and one position to create an employee" : ""} disabled={disabledCreation} onClick={goToAddForm}>
            <i
              className="bi bi-person-fill-add m-3"
            ></i>
            Add employee
          </button>
        </div>
      </div>
      <div className="row table-style">
        {
          <table
            className="table table-striped mb-0"
          >
            <TableHeadComponent
              tableHeadList={employees}
              toDisplay={props.toDisplay}
              tableData={employees}
            />
            {employees?.map((employee: Employee) => (
              <TableElementComponent
                tableData={employee}
                setTableData={setEmployees}
                toDisplay={props.toDisplay}
              />
            ))}
          </table>
        }
      </div>
    </div>
  );
};

export default EmployeeList;
