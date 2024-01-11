import axios from "axios";
import EmployeeModel from "../models/EmployeeModel";

const PROJECT_API_BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = PROJECT_API_BASE_URL+"/v1";
const PROJECT_URI = VERSION_URI+"/project";
const GET_ALL_URI = PROJECT_URI+"/list";
const GET_BY_ID=PROJECT_URI+"/find"
const CREATE_PROJECT=PROJECT_URI+"/create"
const UPDATE_PROJECT=PROJECT_URI+"/update"
const DELETE_PROJECT=PROJECT_URI+"/delete"


const ProjectService = {
    getEmployees(){
        return axios.get(GET_ALL_URI);
    },

    getEmployeeById(employeeId: number | undefined){
        return axios.get(GET_BY_ID, {params:{id:employeeId}})
    },
    
    createEmployee(employee: EmployeeModel | undefined){
        return axios.post(CREATE_PROJECT,employee)
    },
    updateEmployee(employeeId: string | undefined, employee: EmployeeModel | undefined){
        return axios.put(CREATE_PROJECT + '/' + employeeId,employee)
    },

    filterEmployee(employeeFirstName: String){
        return axios.get(CREATE_PROJECT+'/findName/'+employeeFirstName)
    },

    deleteEmployee(employeeId: Number){
        return axios.delete(CREATE_PROJECT+"/"+employeeId)
    }
}

export default ProjectService;