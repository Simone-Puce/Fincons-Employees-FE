import React, { useEffect, useState } from "react";
import EmployeeService from "../../../services/EmployeeService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ListEmployeeComponent.css";
import EmployeeList from "../../Lists/EmployeeList";
import PositionList from "../../Lists/PositionList";
import DepartmentList from "../../Lists/DepartmentList";
import DepartmentService from "../../../services/DepartmentService";
import PositionService from "../../../services/PositionService";
import { useNavigate } from "react-router-dom";

interface Props {
  toDisplayList: string;
  setToDisplayList: React.Dispatch<React.SetStateAction<string>>;
}

const ListEmployeeComponent = (props: Props) => {
  const [employees, setEmployees] = useState<any>();
  const [departments, setDepartments] = useState<any>();
  const [positions, setPositions] = useState<any>();
  const [filterByName, setFilterByName] = useState<string>();
  const navigate = useNavigate()

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
    DepartmentService.getDepartments().then((res) => {
      setDepartments(res.data);
    });
    PositionService.getPositions().then((res) => {
      setPositions(res.data);
    })
  }, [])

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data)
    });
    setFilterByName("created")
  }, [filterByName])

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

  const changeFilterHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempFilter = e.target.value;
    if (tempFilter === "" || tempFilter === undefined) {
      EmployeeService.getEmployees().then((res) => {
        setEmployees(res.data);
      });
      DepartmentService.getDepartments().then((res) => {
        setDepartments(res.data)
      });
      PositionService.getPositions().then((res) => {
        setPositions(res.data);
      });
    } else {
      EmployeeService.filterEmployee(tempFilter).then((res) => {
        setEmployees(res.data);
      });
    }
  }

  const listConditionalRender = () => {
    switch (props.toDisplayList) {
      case "employees":
        return (
          <EmployeeList
            changeFilterHandler={changeFilterHandler}
            tableData={employees}
            setTableData={setEmployees}
            filter={filterByName}
            setfilter={setFilterByName}
            toDisplay={props.toDisplayList}
          />
        )
      case "positions":
        return (
          <PositionList
            changeFilterHandler={changeFilterHandler}
            setTableData={setPositions}
            tableData={positions}
            filter={filterByName}
            setfilter={setFilterByName}
            toDisplay={props.toDisplayList}
          />
        )
      case "departments":
        return (
          <DepartmentList
            changeFilterHandler={changeFilterHandler}
            tableData={departments}
            setTableData={setDepartments}
            filter={filterByName}
            setfilter={setFilterByName}
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
