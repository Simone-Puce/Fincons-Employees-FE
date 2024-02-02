import { Link, useNavigate } from "react-router-dom";
import TableHeadComponent from "../Pages/tableHeadComponent/TableHeadComponent";
import TableElementComponent from "../Pages/tableEmployeeComponent/TableElementComponent";

interface Props {
  changeFilterHandler: React.ChangeEventHandler<HTMLInputElement>;
  tableData: any;
  setTableData: React.Dispatch<React.SetStateAction<any | undefined>>;
  filter: string | undefined;
  setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  toDisplay: string | undefined;

}

const DepartmentList = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/add-employee");
  };

  return (
    <div className="containerList mt-1 pt-1">
      <div className="row mt-4 mb-3">
        <div className="d-flex justify-content-center filterDiv">
          <Link to={"/add-employee"}><button className="btn rounded-pill btn-primary" >
            <i
              className="bi bi-person-fill-add pr-1"
              onClick={handleNavigation}
            ></i>
            Add Department
          </button></Link>
        </div>
      </div>
      <div className="row">
        {
          <table
            className="table table-striped table-bordered"
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

export default DepartmentList;
