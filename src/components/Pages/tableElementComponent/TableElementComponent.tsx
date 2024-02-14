import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TableElementComponent.css";
import utils from "../../../utils/Utils";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import UserService from "../../../services/UserService";
import { getDepartments } from "../../../services/DepartmentService";
import { getPositions } from "../../../services/PositionService";

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

type Props = {
  tableData: any;
  setTableData: React.Dispatch<React.SetStateAction<any | undefined>>;
  toDisplay: string | undefined;
};

const TableElementComponent = (props: Props) => {
  const [tableElementId, setTableElementId] = useState<string>();
  const [firstElement, setFirstElement] = useState<string>();
  const [secondElement, setSecondElemnt] = useState<string>();
  const [thirdElement, setThirdElement] = useState<string>();
  const [isPositionSelected, setIsPositionSelected] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [userHiddenButtons, setUserHiddenButtons] = useState<boolean>();
  const [departmentsList, setDepartmentsList] = useState<any>();
  const [positionList, setPositionList] = useState<any>();
  
  useEffect(() => {
    console.log("i'm in table element component")
    const switchCaseHandler = async () => {
      switch (props.toDisplay) {
        case EMPLOYEE_CASE:
          setTableElementId(props.tableData.ssn);
          setFirstElement(props.tableData.firstName);
          setSecondElemnt(props.tableData.lastName);
          setThirdElement(props.tableData.email);
          break;
        case DEPARTMENT_CASE:
          setTableElementId(props.tableData.departmentCode);
          setFirstElement(props.tableData.name);
          setSecondElemnt(props.tableData.address);
          setThirdElement(props.tableData.city);
          break;
        case POSITION_CASE:
          setTableElementId(props.tableData.positionCode);
          setFirstElement(props.tableData.name.toString());
          setSecondElemnt(props.tableData.salary.toString());
          break;
      }
    };
  
    switchCaseHandler();
  }, [props.toDisplay, props]);

  useEffect(() => {
    if (props.toDisplay === POSITION_CASE) {
      setIsPositionSelected(true);
    } else {
      setIsPositionSelected(false);
    }
  }, [props.tableData, props.toDisplay]);

  useEffect(() => {
    if (props.toDisplay === DEPARTMENT_CASE) {
      if (props.tableData.employees.length > 0) {
        setIsButtonDisabled(true);
      }
    }
    if (props.toDisplay === POSITION_CASE) {
      if(props.tableData.employees.length > 0){
        setIsButtonDisabled(true)
      }
    }
  }, [props.toDisplay, props.tableData]);

  useEffect(() => {
    getDepartments().then((res: any) => {
      setDepartmentsList(res.data);
    });
  }, []);

  useEffect(() => {
    getPositions().then((res: any) => {
      setPositionList(res.data);
    });
  }, []);

  useEffect(() => {
    const jwt = Cookies.get("jwt-token");
    const user = jwtDecode(jwt!);
    UserService.getUserDetails(user.sub).then((res) => {
      if (res.data.data.roles[0].name === "ROLE_ADMIN") {
        setUserHiddenButtons(true);
      }
      if (res.data.data.roles[0].name === "ROLE_USER") {
        setUserHiddenButtons(false);
      }
    });
  }, []);

  const deleteButtonHandler = (id: string | undefined) => {
    switch (props.toDisplay) {
      case EMPLOYEE_CASE:
        //deleteEmployee(parseInt(id!));
        break;
      case DEPARTMENT_CASE:
        if (departmentsList.data.length === 1) {
          Swal.fire({
            title: "Attention",
            text: "You cannot delete a department because it is the only one that exists for an employee",
            icon: "warning",
            confirmButtonText: "OK",
          });
        } else {
          //deleteDepartment(parseInt(id!));
        }
        break;
      case POSITION_CASE:
        if (positionList.data.length === 1) {
          Swal.fire({
            title: "Attention",
            text: "You cannot delete a department because it is the only one that exists for an employee",
            icon: "warning",
            confirmButtonText: "OK",
          });
        } else {
          //deletePosition(parseInt(id!));
        }
        break;
    }
  }

  return (
    <>
      <tbody className="backgroud-style">
        <tr className="backgroud-style align-middle" key={tableElementId}>
          <td className="text-center backgroud-style align-middle">
            {utils.capitalizeFirstLetter(firstElement)}
          </td>
          <td className="text-center backgroud-style align-middle">
            {utils.capitalizeFirstLetter(secondElement)}
          </td>
          <td
            hidden={isPositionSelected}
            className="text-center backgroud-style align-middle"
          >
            {thirdElement}
          </td>
          <td
            hidden={!userHiddenButtons}
            className="text-center backgroud-style"
          >
            <div className="d-flex justify-content-evenly">
              <Link to={`/update-employee/${tableElementId}`}>
                <button className="btn btn-background">
                  <i className="bi bi-pencil-square icon-background"></i>{" "}
                </button>
              </Link>
              <button
                title={
                  isButtonDisabled
                    ? "This can't be deleted because there is at least 1 employee connected to this record"
                    : ""
                }
                className="btn btn-background"
                disabled={isButtonDisabled}
                onClick={(e) => deleteButtonHandler(tableElementId)}
              >
                <i className="bi bi-trash3-fill icon-background"></i>
              </button>
              <Link to={`/view-details/${tableElementId}`}>
                <button type="button" className="btn btn-background">
                  <i className="bi bi-info-circle icon-background"></i>
                </button>
              </Link>
            </div>
          </td>
          <td
            hidden={userHiddenButtons}
            className="text-center backgroud-style"
          >
            <div className="d-flex justify-content-evenly">
              <Link to={`/view-details/${tableElementId}`}>
                <button type="button" className="btn btn-background">
                  <i className="bi bi-info-circle icon-background"></i>
                </button>
              </Link>
            </div>
          </td>
        </tr>
      </tbody>
    </>
  );
};
export default TableElementComponent;
