import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Position from "../../models/PositionModel";
import EmployeeService from "../../services/EmployeeService";
import PositionService from "../../services/PositionService";

const UpdatePositionForm = () => {
  const [position, setPosition] = useState<Position>();
  const { id } = useParams();
  const idPosition = parseInt(id!);

  const navigate = useNavigate();

  useEffect(() => {
    PositionService.getPositionById(idPosition).then((res) => {
      setPosition(res.data.data);
    });
  }, []);


  const UpdatePosition = () => {
    PositionService.updatePosition(idPosition, position!);
    navigate("/employees");
  };

  const backToList = () => [navigate("/Employees")];

  return (
    <div className="createContainer mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center"> Update position </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Position name</label>
                  <input
                    placeholder="First name"
                    name="name"
                    className="form-control"
                    value={position?.name}
                    onChange={(e) => {
                      setPosition({
                        ...position!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Salary</label>
                  <input
                    placeholder="Last name"
                    type="number"
                    name="salary"
                    className="form-control"
                    value={position?.salary}
                    onChange={(e) => {
                      setPosition({
                        ...position!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>

                <button className="btn btn-success" onClick={UpdatePosition}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={backToList}
                >
                  {" "}
                  Cancel{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePositionForm;
