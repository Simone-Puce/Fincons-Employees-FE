import React, { useEffect, useState } from "react";
import EmployeeService from "../../services/EmployeeService";
import { Link } from "react-router-dom";
import '../../App.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import './ListEmployeeComponent.css'
import TableElementComponent from "../tableEmployeeComponent/TableElementComponent";
import TableHeadComponent from "../tableHeadComponent/TableHeadComponent";


const ListEmployeeComponent = () => {
  type EmployeeExample = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };

  const [employees, setEmployees] = useState<EmployeeExample[]>();
  const [filterByName, setFilterByName] = useState<string>();
  const [hiddenTable, setHiddenTable] = useState<boolean>(true)

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  })

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
    setFilterByName("created")
  }, [filterByName]);

  function changeFilterHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let tempFilter = e.target.value;
    if (tempFilter === "" || tempFilter === undefined) {
      EmployeeService.getEmployees().then((res) => {
        setEmployees(res.data);
      });
    } else {
      EmployeeService.filterEmployee(tempFilter).then((res) => {
        setEmployees(res.data);
      });
    }
  }

  const employeeListCheck = () =>{
    if(employees !== undefined && employees.length >= 1){
      setHiddenTable(false);
    }else{
      setHiddenTable(true)
    }
    return hiddenTable
  };

  return (
    <div className="containerList">
      <div className="row">
        <div className="filterDiv">
          <Link to="/add-employee">
            <button className="btn btn-primary addButton">
              <i className="bi bi-person-fill-add"></i>
            </button>
          </Link>
          <input
            type="text"
            className="filterTextBox"
            placeholder="filter by name"
            id="filterByName"
            name="filterByName"
            onChange={changeFilterHandler}
          ></input>
        </div>
      </div>
      <div className="row">
        {
          <table
          
            className="table table-striped table-bordered"
            style={{ marginBottom: 70 }}
          >
            <TableHeadComponent employees={employees}/>
            {employees?.map((element) => (
              <TableElementComponent
                key={element.id}
                props={{
                  id: element.id,
                  firstName: element.firstName,
                  lastName: element.lastName,
                  email: element.email,
                }} filter={filterByName} setfilter={setFilterByName}
              />
            )
            )}
          </table>
        }
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
