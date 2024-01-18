import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeeService from "../../services/EmployeeService";
import Employee from "../../models/EmployeeModel";


const FileList = () => {

  const [employee, setEmployee] = useState<Employee>()
  const navigate = useNavigate();
  const { id } = useParams();
  const idEmployee = parseInt(id!);

  useEffect(() => {
    EmployeeService.getEmployeeById(idEmployee).then((res) => {
      setEmployee(res.data.data);
    });
  }, []);

  const goToHomepage = () => {
    navigate("/employees");
  };

  return (
    <div className="container">
      <div className="mt-5 pt-3">
        <div className="card col-md-6 offset-md-3 mt-5">
          <h3 className="text-center"> {employee?.firstName} {employee?.lastName}'s file </h3>
          <div className="card-body">
            <table>
              <thead>
                <tr className="text-center">
                  <th>Name</th>
                  <th>Description</th>
                  <th>Extension</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {/*<div className="row d-flex justify-content-center">
                  {employee?.fileList?.map(singleFile => (
                    <label className="mb-3 text-center">
                      {" "}
                      File name: {singleFile.name}{" "}
                    </label>
                  ))}
                  </div>*/}
                {
                  employee?.fileList?.map(singleFile => (
                    <tr className="text-center">
                      <td>{singleFile.name}</td>
                      <td>{singleFile.description}</td>
                      <td>{singleFile.extension}</td>
                      <td><button> carlo vitto </button></td>
                    </tr>
                  ))
                }
              </tbody>

            </table>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={goToHomepage}
              >
                {" "}
                Go back to the employee list
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileList;
