import React, { useEffect, useState } from "react";
import EmployeeService from "../../../services/EmployeeService";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./ListEmployeeComponent.css";
import EmployeeList from "../../Lists/EmployeeList";
import PositionList from "../../Lists/PositionList";
import DepartmentList from "../../Lists/DepartmentList";
import DepartmentService from "../../../services/DepartmentService";
import PositionService from "../../../services/PositionService";

interface Props {
  toDisplayList: string;
}

const ListEmployeeComponent = (props: Props) => {
  const [employees, setEmployees] = useState<any>();
  const [departments, setDepartments] = useState<any>();
  const [positions, setPositions] = useState<any>();
  const [filterByName, setFilterByName] = useState<string>();

  useEffect(() => {
    if (filterByName !== "created") {
      EmployeeService.getEmployees().then((res) => {
        setEmployees(res.data);
      });
      DepartmentService.getDepartments().then((res) => {
        setDepartments(res.data);
      });
      PositionService.getPositions().then((res) => {
        setPositions(res.data);
      });
    }
  });

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
    setFilterByName("created");
  }, [filterByName]);

  function changeFilterHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let tempFilter = e.target.value;
    if (tempFilter === "" || tempFilter === undefined) {
      EmployeeService.getEmployees().then((res) => {
        setEmployees(res.data);
      });
      DepartmentService.getDepartments().then((res) => {
        setDepartments(res.data);
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
            filter={filterByName}
            setfilter={setFilterByName}
            toDisplay={props.toDisplayList}
          />
        );
      case "positions":
        return (
          <PositionList
            changeFilterHandler={changeFilterHandler}
            tableData={positions}
            filter={filterByName}
            setfilter={setFilterByName}
            toDisplay={props.toDisplayList}
          />
        );
      case "departments":
        return (
          <DepartmentList
            changeFilterHandler={changeFilterHandler}
            tableData={departments}
            filter={filterByName}
            setfilter={setFilterByName}
            toDisplay={props.toDisplayList}
          />
        );
    }
  };

  return (
    <div className="container">
      {listConditionalRender()}</div>
  )
};

export default ListEmployeeComponent;
