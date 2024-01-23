import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FileService from "../../../services/FileService";
import FileModel from "../../../models/FileModel";

const ViewFileComponent = () => {

    const [singleFile, setSingleFile] = useState<FileModel>()
    const [encodedFile, setEncodedFile] = useState<string>()
    const navigate = useNavigate();
    const { id } = useParams();
    const idFile = parseInt(id!);

    useEffect(() => {
        FileService.viewFile(idFile).then((res) => {   
          setSingleFile(res.data);
        });

      },[]);

    const goToFileListEmp = () => {
        navigate("/file/list/" + singleFile?.employeeId.id);
    };

    //const decodedFile = atob(encodedFile);


    return (
        <div>
            <div className="mt-5 pt-3">
                <div className="card col-md-6 offset-md-3 mt-5">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={goToFileListEmp}>
                    {" "}
                    Go back to the file list 
                </button>
                <div>
                <img src="" alt="" />
                </div>
                </div>
            </div>
        </div>

    )
}
export default ViewFileComponent