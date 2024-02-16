import { useNavigate } from "react-router-dom";
import TableHeadComponent from "../Pages/tableHeadComponent/TableHeadComponent";
import TableElementComponent from "../Pages/tableElementComponent/TableElementComponent";
import { useEffect, useState } from "react";
import { getDepartments } from "../../services/DepartmentService";
import Department from "../../models/DepartmentModel";

interface Props {
  toDisplay: string;
}

const DepartmentList = (props: Props) => {
  const [departments, setDepartments] = useState<Department[]>()
  const navigate = useNavigate();

  const goToAddDepartment = () => {
    navigate("/add-employee");
  };

  useEffect(()=>{
    const carlo =  getDepartments()
    console.log(carlo)
  },[])

  return (
    <div className="containerList mt-1 pt-1 pb-4">
      <div className="row mt-4 mb-3">
        <div className="d-flex justify-content-center filterDiv">
          <button className="btn rounded-pill btn-add text-white w-25" onClick={goToAddDepartment} >
            <i
              className="bi bi-person-fill-add m-3"
            ></i>
            Add Department
          </button>
        </div>
      </div>
      <div className="row table-style">
        {
          <table
            className="table table-striped mb-0"
          >
            <TableHeadComponent
              tableHeadList={departments}
              toDisplay={props.toDisplay}
              tableData={departments}
            />
            {departments?.map((tableData: any) => (
              <TableElementComponent
                tableData={departments}
                setTableData={setDepartments}
                toDisplay={props.toDisplay}
              />
            ))}
          </table>
        }
      </div>
    </div>
  );
};

export default DepartmentList;
