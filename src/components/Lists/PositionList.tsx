import { Link, useNavigate } from "react-router-dom";
import TableHeadComponent from "../Pages/tableHeadComponent/TableHeadComponent";
import TableElementComponent from "../Pages/tableEmployeeComponent/TableElementComponent";

interface Props {
  changeFilterHandler: React.ChangeEventHandler<HTMLInputElement>;
  tableData: any;
  filter: string | undefined;
  setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  toDisplay: string | undefined;
}

const PositionList = (props: Props) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/add-employee");
  };
  

  return (
    <div className="containerList mt-5 pt-5">
      <div className="row mt-4 mb-3">
      <div className="d-flex justify-content-center filterDiv">
      <Link to={"/add-employee"}><button className="btn rounded-pill btn-primary" >
            <i
              className="bi bi-person-fill-add"
              style={{ paddingRight: 5 }}
              onClick={handleNavigation}
            ></i>
            Add Position
          </button></Link>
          <input
            type="text"
            className="filterTextBox"
            placeholder="filter by name"
            id="filterByName"
            name="filterByName"
            onChange={props.changeFilterHandler}
          ></input>
        </div>
      </div>
      <div className="row">
        {
          <table
            className="table table-striped table-bordered"
            style={{ marginBottom: 70 }}
          >
            <TableHeadComponent
              tableHeadList={props.tableData}
              toDisplay={props.toDisplay}
            />
            {props.tableData?.data?.map((position: any) => (
              <TableElementComponent
                key={position.id}
                tableData={position}
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

export default PositionList;
