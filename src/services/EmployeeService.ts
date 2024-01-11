import axios from "axios";
import EmployeeModel from "../models/EmployeeModel";

const EMPLOYEE_API_BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = EMPLOYEE_API_BASE_URL+"/v1";
const EMPLOYEES_URI = VERSION_URI+"/employee";
const GET_ALL_URI = EMPLOYEES_URI+"/list";
const DELETE_BY_EMAIL_URI=EMPLOYEES_URI+"/email";
const GET_BY_ID=EMPLOYEES_URI+"/find"


const EmployeeService = {
    getEmployees(){
        return axios.get(GET_ALL_URI);
    },

    deleteByEmail(emailToDelete:string){
        return axios.delete(DELETE_BY_EMAIL_URI, {params:{email: emailToDelete}})
    },

    getByEmail(emailToDelete:string){
        return axios.get(DELETE_BY_EMAIL_URI, {params:{email: emailToDelete}})
    },

    getById(employeeId: number | undefined){
        return axios.get(GET_BY_ID, {params:{id:employeeId}})
    },
    
    createEmployee(employee: EmployeeModel | undefined){
        return axios.post(EMPLOYEE_API_BASE_URL,employee)
    },
    updateEmployee(employeeId: string | undefined, employee: EmployeeModel | undefined){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId,employee)
    },

    filterEmployee(employeeFirstName: String){
        return axios.get(EMPLOYEE_API_BASE_URL+'/findName/'+employeeFirstName)
    },

    deleteEmployee(employeeId: Number){
        return axios.delete(EMPLOYEE_API_BASE_URL+"/"+employeeId)
    }
}

export default EmployeeService;