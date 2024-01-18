import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentService from "../../services/DepartmentService";
import Department from "../../models/DepartmentModel";

const UpdateDepartmentForm = () => {
  const [department, setDepartment] = useState<Department>();
  const { id } = useParams();
  const idDepartment = parseInt(id!);

  const navigate = useNavigate();

  useEffect(() => {
    DepartmentService.getDepartmentById(idDepartment).then((res) => {
      setDepartment(res.data.data);
    });
  }, []);


  const UpdatePosition = () => {
    DepartmentService.updateDepartment(idDepartment, department!);
    navigate("/spinner");
  };

  const backToList = () => [navigate("/Employees")];

  return (
    <div className="createContainer mt-5 pt-5">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center"> Update department </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Department name</label>
                  <input
                    placeholder="First name"
                    name="name"
                    className="form-control"
                    value={department?.name}
                    onChange={(e) => {
                      setDepartment({
                        ...department!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    placeholder="Address"
                    name="address"
                    className="form-control"
                    value={department?.address}
                    onChange={(e) => {
                      setDepartment({
                        ...department!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    placeholder="City"
                    name="city"
                    className="form-control"
                    value={department?.city}
                    onChange={(e) => {
                      setDepartment({
                        ...department!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>
                <div className="d-flex justify-content-center mt-3">
                <button className="btn btn-success" onClick={UpdatePosition}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={backToList}
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
};

export default UpdateDepartmentForm;
