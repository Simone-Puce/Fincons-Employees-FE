import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Position from "../../models/PositionModel";
import PositionService from "../../services/PositionService";
import Utils from "../../utils/Utils";
import "./Styles/FormStyles.css"


const CreatePositionForm = () => {
    const [position, setPosition] = useState<Position>();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
    const [salaryValueValid, setSalaryValueValid] = useState<boolean>(false)
    const [positionNameValid, setPositionNameValid] = useState<boolean>(false)
  
    useEffect(()=>{
      checkSubmit()
    },[isButtonDisabled,salaryValueValid,position])
  

    const checkSubmit = () => {
      if (salaryValueValid === false || positionNameValid === false ) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    };

    const navigate = useNavigate();
  
    const goBackToList = () => {
      navigate("/spinner");
    };
  
    const savePosition = () => {
      PositionService.createPosition(position!);
      navigate("/spinner");
    };

    return (
        <div className="createContainer mt-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                <h3 className="text-center"> Create position </h3>
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
                          setPositionNameValid(Utils.valideField(e.target.value))
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
                          setSalaryValueValid(Utils.valideField(e.target.value))
                        }}
                        
                      ></input>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                    <button
                    className="btn btn-success pointer-control"
                    onClick={savePosition}
                    disabled={isButtonDisabled}
                    title={isButtonDisabled ? "some fields are not valid, please check the values" : ""}
                  >
                    Save
                  </button>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={goBackToList}
                    >
                      
                      Cancel
                    </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default CreatePositionForm;