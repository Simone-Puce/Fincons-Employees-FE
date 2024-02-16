import axios from "axios";
import Employee from "../models/EmployeeModel";
import Cookies from "js-cookie";

const EMPLOYEE_API_BASE_URL =
    "http://localhost:8080/company-employee-management";
const VERSION_URI = EMPLOYEE_API_BASE_URL + "/v1";
const EMPLOYEES_URI = VERSION_URI + "/employee";
const GET_ALL_URI = EMPLOYEES_URI + "/list";
const GET_BY_SSN = EMPLOYEES_URI + "/find-by-ssn";
const CREATE_EMPLOYEE = EMPLOYEES_URI + "/create";
const UPDATE_EMPLOYEE = EMPLOYEES_URI + "/update";
const DELETE_EMPLOYEE = EMPLOYEES_URI + "/delete";

const token = Cookies.get("jwt-token");
const config = { Authorization: `Bearer ${token}` }

export const getEmployees = async () => {
    const response = await axios.get(GET_ALL_URI, { headers: { Authorization: `Bearer ${token}` } });
    return response.data
}

export const getEmployeeBySSN = async (ssn: string) => {
    const response = await axios.get(GET_BY_SSN, {
        params: { ssn: ssn },
        headers: config
    }
    )
    return response.data;
}

export const createEmployee = async (employee: Employee) => {
    const response = await axios.post(
        CREATE_EMPLOYEE,
        {
            ssn: employee.ssn,
            firstName: employee?.firstName,
            lastName: employee?.lastName,
            gender: employee?.gender,
            birthDate: employee?.birthDate,
            email: employee?.email,
            startDate: employee?.startDate,
            endDate: employee?.endDate,
            department: { departmentCode: employee.departmentCode },
            position: { positionCode: employee.positionCode },
        },
        {
            headers: config
        }
    )
    return response.data
}

export const updateEmployee = async (updatedEmployee: Employee) => {
    console.log(updatedEmployee, "sono nel service")
    const response = await axios.put(
        UPDATE_EMPLOYEE,
        {
            ssn: updatedEmployee.ssn,
            firstName: updatedEmployee?.firstName,
            lastName: updatedEmployee?.lastName,
            gender: updatedEmployee?.gender,
            birthDate: updatedEmployee?.birthDate,
            email: updatedEmployee?.email,
            startDate: updatedEmployee?.startDate,
            endDate: updatedEmployee?.endDate,
            departmentCode: updatedEmployee.departmentCode,
            positionCode: updatedEmployee.positionCode,
        },
        {
            params: { ssn: updatedEmployee.ssn },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}

export const deleteEmployee = async (ssn: string) => {
    const response = await axios.delete(DELETE_EMPLOYEE, {
        params: { ssn: ssn },
        headers: config
    })
    return response.data
}

