import axios from "axios";
import Department from "../models/DepartmentModel";
import Cookies from "js-cookie";

const DEPARTMENT_API_BASE_URL = "http://localhost:8080/company-employee-management";
const VERSION_URI = DEPARTMENT_API_BASE_URL+"/v1";
const DEPARTMENT_URI = VERSION_URI+"/department";
const GET_ALL_URI = DEPARTMENT_URI+"/list";
const GET_BY_ID=DEPARTMENT_URI+"/find-by-id"
const CREATE_DEPARTMENT=DEPARTMENT_URI+"/create"
const UPDATE_DEPARTMENT=DEPARTMENT_URI+"/update"
const DELETE_DEPARTMENT=DEPARTMENT_URI+"/delete"

const token = Cookies.get("jwt-token");
const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const DepartmentService = {
    getDepartments(){
        return axios.get(GET_ALL_URI, config);
    },

    getDepartmentById(departmentId: number | undefined){
        return axios.get(GET_BY_ID, {params:{id:departmentId}, headers: { Authorization: `Bearer ${token}` }})
    },
    
    createDepartment(department: Department){
        return axios.post(CREATE_DEPARTMENT,department,{headers: { Authorization: `Bearer ${token}` }})
    },

    updateDepartment(departmentId: number, updatedDepartment: Department){
        return axios.put(
            UPDATE_DEPARTMENT,
            {   name: updatedDepartment?.name,
                address: updatedDepartment?.address,
                city: updatedDepartment.city
            },
            { 
                params: { id: departmentId }, 
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        );
    },

    deleteDepartment(departmentId: number | undefined) {
        return axios.delete(DELETE_DEPARTMENT,{params:{id:departmentId}})
    }
}

export default DepartmentService;