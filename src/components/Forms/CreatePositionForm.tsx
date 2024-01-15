import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Position from "../../models/PositionModel";
import PositionService from "../../services/PositionService";

const CreatePositionForm = () => {

    const [position, setPosition] = useState<Position>();

    const navigate = useNavigate();
  
    const goBackToList = () => {
      navigate("/employees");
    };
  
    const savePosition = () => {
      PositionService.createPosition(position!);
      navigate("/employees");
    };

    return (
        <div className="createContainer mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center"> Create Department </h3>
                <div className="card-body">
                  <form>
    
                    <div className="form-group">
                      <label>Position</label>
                      <input
                        placeholder="Position"
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
                        type="number"
                        placeholder="Salary"
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
    
                    <button
                      className="btn btn-success"
                      onClick={savePosition}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={goBackToList}
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
}

export default CreatePositionForm;