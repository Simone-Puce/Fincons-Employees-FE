import "bootstrap-icons/font/bootstrap-icons.css";
import "./ListEmployeeComponent.css";
import EmployeeList from "../../Lists/EmployeeList";
import PositionList from "../../Lists/PositionList";
import DepartmentList from "../../Lists/DepartmentList";
import { useNavigate } from "react-router-dom";

interface Props {
  toDisplayList: string;
  setToDisplayList: React.Dispatch<React.SetStateAction<string>>;
}

const ListEmployeeComponent = (props: Props) => {
  const navigate = useNavigate()


  const handleEmployeeList = () => {
    props.setToDisplayList("employees")
    navigate("/employees")
  }

  const handlePositionList = () => {
    props.setToDisplayList("positions")
    navigate("/employees")
  }

  const handleDepartmentList = () => {
    props.setToDisplayList("departments")
    navigate("/employees")
  }

  const listConditionalRender = () => {
    switch (props.toDisplayList) {
      case "employees":
        return (
          <EmployeeList
            toDisplay={props.toDisplayList}
          />
        )
      case "positions":
        return (
          <PositionList
            toDisplay={props.toDisplayList}
          />
        )
      case "departments":
        return (
          <DepartmentList
            toDisplay={props.toDisplayList}
          />
        )
    }
  }

  return (
    <div className="col mt-5 pt-5 footer-manager">
      <div className="d-flex justify-content-evenly">
        <button className="btn btn-color rounded-pill mr-5 pr-5 w-25 h-25" onClick={handleEmployeeList}> Employees </button>
        <button className="btn btn-color rounded-pill mr-5 pr-5 pl-5 ml-5 w-25 h-25" onClick={handleDepartmentList}> Departments</button>
        <button className="btn btn-color rounded-pill ml-5 w-25 h-25" onClick={handlePositionList}> Positions</button>
      </div>
      <div className="container">
        {listConditionalRender()}
      </div>
    </div>
  )
}

export default ListEmployeeComponent;
