import { useNavigate } from "react-router-dom";
import TableHeadComponent from "../Pages/tableHeadComponent/TableHeadComponent";
import TableElementComponent from "../Pages/tableEmployeeComponent/TableElementComponent";
import { useEffect, useState } from "react";
import DepartmentService from "../../services/DepartmentService";
import PositionService from "../../services/PositionService";
import './style/EmployeeList.css'

interface Props {
  changeFilterHandler: React.ChangeEventHandler<HTMLInputElement>;
  tableData: any;
  setTableData: React.Dispatch<React.SetStateAction<any | undefined>>;
  filter: string | undefined;
  setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  toDisplay: string | undefined;
}

const EmployeeList = (props: Props) => {
  const [disabledCreation, setDisabledCreation] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(()=>{
    DepartmentService.getDepartments().then(( res ) => {
      if(res.data.data.length === 0){
        setDisabledCreation(true)
      }
    })
    PositionService.getPositions().then(( res ) => {
      if(res.data.data.length === 0){
        setDisabledCreation(true)
      }
    })
  },[props.toDisplay])

  const goToAddForm = () =>{
    navigate("/add-employee")
  }

  return (
    <div className="containerList mt-1 pt-1">
      <div className="row mt-4 mb-3">
        <div className="d-flex justify-content-center filterDiv">
          <button className="btn rounded-pill btn-primary create-button" title={disabledCreation ? "You need at least one department and one position to create an employee" : ""} disabled={disabledCreation} onClick={goToAddForm}>
            <i
              className="bi bi-person-fill-add pr-1"
            ></i>
            Add Employee
          </button>
        </div>
      </div>
      <div className="row table-style">
        {
          <table
            className="table table-striped mb-0"
          >
            <TableHeadComponent
              tableHeadList={props.tableData}
              toDisplay={props.toDisplay}
              tableData={props.tableData}
            />
            {props.tableData?.data?.map((tableData: any) => (
              <TableElementComponent
                key={tableData.id}
                tableData={tableData}
                setTableData={props.setTableData}
                filter={props.filter}
                setfilter={props.setfilter}
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
