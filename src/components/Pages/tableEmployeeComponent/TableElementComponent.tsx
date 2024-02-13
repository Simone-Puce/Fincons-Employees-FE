import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EmployeeService from "../../../services/EmployeeService";
import "./TableElementComponent.css";
import "./TableElementComponent.css";
import utils from "../../../utils/Utils";
import DepartmentService from "../../../services/DepartmentService";
import PositionService from "../../../services/PositionService";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import LoginRegistrationService from "../../../services/LoginRegistrationService";
import EmployeeList from "../../Lists/EmployeeList";
import Swal from "sweetalert2";

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

type Props = {
  tableData: any;
  setTableData: React.Dispatch<React.SetStateAction<any | undefined>>;
  filter: string | undefined;
  setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
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
  const navigate = useNavigate();

  useEffect(() => {
    switch (props.toDisplay) {
      case EMPLOYEE_CASE:
        setTableElementId(props.tableData.id);
        setFirstElement(props.tableData.firstName);
        setSecondElemnt(props.tableData.lastName);
        setThirdElement(props.tableData.email);
        break;
      case DEPARTMENT_CASE:
        setTableElementId(props.tableData.id);
        setFirstElement(props.tableData.name);
        setSecondElemnt(props.tableData.address);
        setThirdElement(props.tableData.city);
        break;
      case POSITION_CASE:
        setTableElementId(props.tableData.id);
        setFirstElement(props.tableData.name.toString());
        setSecondElemnt(props.tableData.salary.toString());
        break;
    }
  }, [props.toDisplay, props.setfilter, props]);

  useEffect(() => {
    if (props.toDisplay === POSITION_CASE) {
      setIsPositionSelected(true);
    } else {
      setIsPositionSelected(false);
    }
  }, [props.tableData, props.toDisplay]);
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
      EmployeeService.getEmployees().then((res: any) => {
        if (Array.isArray(res.data.data)) {
          res.data.data.map((singleData: any) => {
            if (singleData.position.name === props.tableData.name) {
              setIsButtonDisabled(true);
            }
            return null;
          });
        }
      });
    }
  }, [props.toDisplay, props.tableData]);

  useEffect(() => {
    const jwt = Cookies.get("jwt-token");
    const user = jwtDecode(jwt!);
    LoginRegistrationService.getUserDetails(user.sub).then((res) => {
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
        EmployeeService.deleteEmployee(parseInt(id!));
        navigate("/spinner");
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
          DepartmentService.deleteDepartment(parseInt(id!));
          navigate("/spinner");
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
          PositionService.deletePosition(parseInt(id!));
          navigate("/spinner");
        }
        break;
    }
    props.setfilter("");
  };

  return (
    <>
      <tbody className="backgroud-style">
        <tr className="backgroud-style align-middle" key={tableElementId}>
          <td className="text-center backgroud-style align-middle">
            {" "}
            {utils.capitalizeFirstLetter(firstElement)}
          </td>
          <td className="text-center backgroud-style align-middle">
            {" "}
            {utils.capitalizeFirstLetter(secondElement)}
          </td>
          <td
            hidden={isPositionSelected}
            className="text-center backgroud-style align-middle"
          >
            {" "}
            {thirdElement}
          </td>
          <td
            hidden={!userHiddenButtons}
            className="text-center backgroud-style"
          >
            <div className="d-flex justify-content-evenly">
              <Link to={`/update-employee/${tableElementId}`}>
                <button className="btn btn-background">
                  {" "}
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
              <Link to={`/view-employee/${tableElementId}`}>
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
              <Link to={`/view-employee/${tableElementId}`}>
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
