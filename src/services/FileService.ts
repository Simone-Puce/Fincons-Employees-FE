import axios from "axios";
import File from "../models/FileModel";

const FILE_API_BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = FILE_API_BASE_URL+"/v1";
const GET_ALL_FILE = VERSION_URI+"/file/list";
const UPLOAD_FILE = VERSION_URI+"/file/upload";
const VIEW_FILE = VERSION_URI+"/file/view-file";
const DOWNLOAD_FILE = VERSION_URI+"/file/download";
const DELETE_FILE = VERSION_URI+"/file/delete-file";



const FileService = {
    getFiles(){
        return axios.get(GET_ALL_FILE);
    },

    viewFile(fileId: number){
        return axios.get(VIEW_FILE+"/"+fileId)
    },
    
    uploadFile(file: File){
        return axios.post(UPLOAD_FILE,file)
    },

    downloadFile(file: File){
        return axios.post(DOWNLOAD_FILE,file)
    },


    deleteFile(fileId: number) {
        return axios.delete(DELETE_FILE+"/"+fileId)
    }
}

export default FileService;