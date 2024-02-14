import axios from "axios";
import Department from "../models/DepartmentModel";
import Cookies from "js-cookie";

const DEPARTMENT_API_BASE_URL = "http://localhost:8080/company-employee-management";
const VERSION_URI = DEPARTMENT_API_BASE_URL + "/v1";
const DEPARTMENT_URI = VERSION_URI + "/department";
const GET_ALL_URI = DEPARTMENT_URI + "/list";
const GET_BY_DEPARTMENT_CODE = DEPARTMENT_URI + "/find-by-code"
const CREATE_DEPARTMENT = DEPARTMENT_URI + "/create"
const UPDATE_DEPARTMENT = DEPARTMENT_URI + "/update"
const DELETE_DEPARTMENT = DEPARTMENT_URI + "/delete"

const token = Cookies.get("jwt-token");
const config = { Authorization: `Bearer ${token}` }

export const getDepartments = async () => {
    try {
        const response = await axios.get(GET_ALL_URI, { headers: config });
        return response.data;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

export const getDepartmentByDepartmentCode = async (departmentCode: string) => {
    try {
        const response = await axios.get(GET_BY_DEPARTMENT_CODE, { params: { departmentCode: departmentCode }, headers: config });
        return response.data;
    } catch (error) {
        console.error('Error fetching department by department code:', error);
        throw error;
    }
};

export const createDepartment = async (department : Department) => {
    try {
        const response = await axios.post(CREATE_DEPARTMENT, department, { headers: config });
        return response.data;
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
};

export const updateDepartment = async (updatedDepartment : Department) => {
    try {
        const response = await axios.put(
            UPDATE_DEPARTMENT,
            {
                deparmentCode: updatedDepartment?.departmentCode,
                name: updatedDepartment?.name,
                address: updatedDepartment.address,
                city: updatedDepartment.city
            },
            {
                params: { departmentCode: updatedDepartment?.departmentCode },
                headers: config
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating department:', error);
        throw error;
    }
};

export const deleteDepartment = async (departmentCode: string) => {
    try {
        const response = await axios.delete(DELETE_DEPARTMENT, { params: { departmentCode: departmentCode } });
        return response.data;
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
};