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
import { ScaleLoader } from 'react-spinners';


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
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    setShowSpinner(true)
    setTimeout(() => {
      setShowSpinner(false)
    }, 500)
  }, [props.toDisplayList])

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
  },);

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
    setFilterByName("created");
  }, [filterByName]);

  const handleEmployeeList = () => {
    props.setToDisplayList("employees")
    navigate("/spinner");
  };

  const handlePositionList = () => {
    props.setToDisplayList("positions")
    navigate("/spinner");
  };

  const handleDepartmentList = () => {
    props.setToDisplayList("departments")
    navigate("/spinner");
  };

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
        );
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
        );
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
        );
    }
  };

  return (
    <>
      {
        showSpinner ? (
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='spinner-container'>
              <ScaleLoader color="#000000" loading={true} />
            </div>
          </div>
        ) : (
          <div className="col mt-5 pt-5">
            <div className="d-flex justify-content-evenly">
              <button className="btn rounded-pill btn-primary mr-5 pr-5" onClick={handleEmployeeList}> Employees </button>
              <button className="btn rounded-pill btn-info mr-5 pr-5 pl-5 ml-5" onClick={handleDepartmentList}> Departments</button>
              <button className="btn rounded-pill btn-secondary ml-5" onClick={handlePositionList}> Positions</button>
            </div>
            <div className="container">
              {listConditionalRender()}
            </div>
          </div>
        )
      }
    </ >
  )
};

export default ListEmployeeComponent;
