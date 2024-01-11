import axios from "axios";
import EmployeeModel from "../models/EmployeeModel";
import Department from "../models/DepartmentModel";

const DEPARTMENT_API_BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = DEPARTMENT_API_BASE_URL+"/v1";
const DEPARTMENT_URI = VERSION_URI+"/department";
const GET_ALL_URI = DEPARTMENT_URI+"/list";
const GET_BY_ID=DEPARTMENT_URI+"/find"
const CREATE_DEPARTMENT=DEPARTMENT_URI+"/create"
const UPDATE_DEPARTMENT=DEPARTMENT_URI+"/update"
const DELETE_DEPARTMENT=DEPARTMENT_URI+"/delete"

const EmployeeService = {
    getDepartments(){
        return axios.get(GET_ALL_URI);
    },

    getDepartmentsById(departmentId: number | undefined){
        return axios.get(GET_BY_ID, {params:{id:departmentId}})
    },
    
    createDepartment(department: Department){
        return axios.post(CREATE_DEPARTMENT,department)
    },

    updateDepartment(departmentId: number, updatedDepartment: Department){
        return axios.put(UPDATE_DEPARTMENT,{params:{id: departmentId}, updatedDepartment})
    },

    deleteEmployee(departmentId: number){
        return axios.delete(DELETE_DEPARTMENT,{params:{id:departmentId}})
    }
}

export default EmployeeService;