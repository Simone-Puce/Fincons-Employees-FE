import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EmployeeService from "../../services/EmployeeService";
import Employee from "../../models/EmployeeModel";
import FileService from "../../services/FileService";


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


  const deleteFile = (fileId: number) => {
    FileService.deleteFile(fileId);
  };


  const goToViewEmployee = () => {
    navigate("/view-employee/"+idEmployee);
  };

  return (
    <div className="container">
      <div className="mt-5 pt-3">
        <div className="card col-md-6 offset-md-3 mt-5">
                  <h3 className="text-center"> {employee?.firstName} {employee?.lastName}'s file </h3>

          <div className="card-body d-flex justify-content-center" >

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
                {
                  employee?.fileList?.map(singleFile => (
                    <tr className="text-center">
                      <td>{singleFile.id}</td>
                      <td>{singleFile.name}</td>
                      <td>{singleFile.description}</td>
                      <td>{singleFile.extension}</td>
                      <div className="btn-group m-2" role="group">
                      <Link to={`/view-file/${singleFile.id}`}><button type="button" className="bi bi-eye btn btn-outline-primary"></button></Link>      
                        <button type="button" className="bi bi-cloud-download btn btn-outline-success" onClick={() => FileService.downloadFile(singleFile)}></button>
                        <button type="button" className="bi bi-trash btn btn-outline-danger" onClick={() => deleteFile(singleFile.id)}></button>
                      </div>
                      {/*<td><button className="bi bi-eye btn rounded-pill btn-primary"></button></td>
                      <td><button className="bi bi-cloud-download btn rounded-pill btn-success"></button></td>
                      <td><button className="bi bi-trash btn rounded-pill btn-danger"></button></td>*/}
                    </tr>
                  ))
                }
              </tbody>

            </table>

          </div>
          <div className="d-flex justify-content-center">
            <button type="button" className="btn btn-success">
              {" "}
              Upload a new file
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={goToViewEmployee}>
              {" "}
              Go back to the employee list
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FileList;
