import { useNavigate } from "react-router-dom";
import TableHeadComponent from "../Pages/tableHeadComponent/TableHeadComponent";
import TableElementComponent from "../Pages/tableElementComponent/TableElementComponent";
import { useEffect, useState } from "react";
import Position from "../../models/PositionModel";
import { getPositions } from "../../services/PositionService";

interface Props {
  toDisplay: string;
}

const PositionList = (props: Props) => {
  const [positions, setPositions] = useState<Position[]>()
  const navigate = useNavigate();

  const goToAddPosition = () => {
    navigate("/add-employee");
  };

  useEffect(()=>{
    const carlo =  getPositions()
    console.log(carlo)
  },[])

  return (
    <div className="containerList mt-1 pt-1 pb-4">
      <div className="row mt-4 mb-3">
        <div className="d-flex justify-content-center filterDiv">
          <button className="btn rounded-pill btn-add text-white w-25" onClick={goToAddPosition} >
            <i
              className="bi bi-person-fill-add m-3"
            ></i>
            Add position
          </button>
        </div>
      </div>
      <div className="row table-style">
        {
          <table
            className="table table-striped mb-0"          >
            <TableHeadComponent
              tableHeadList={positions}
              toDisplay={props.toDisplay}
              tableData={positions}
            />
            {positions?.map((position: any) => (
              <TableElementComponent
                tableData={position}
                setTableData={setPositions}
                toDisplay={props.toDisplay}
              />
            ))}
          </table>
        }
      </div>
    </div>
  )
}

export default PositionList;
