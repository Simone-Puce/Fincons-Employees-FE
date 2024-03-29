import axios from "axios";
import Employee from "../models/EmployeeModel";
import Cookies from "js-cookie";

const EMPLOYEE_API_BASE_URL =
    "http://localhost:81/be/company-employee-management";
const VERSION_URI = EMPLOYEE_API_BASE_URL + "/v1";
const EMPLOYEES_URI = VERSION_URI + "/employee";
const GET_ALL_URI = EMPLOYEES_URI + "/list";
const GET_BY_ID = EMPLOYEES_URI + "/find-by-id";
const CREATE_EMPLOYEE = EMPLOYEES_URI + "/create";
const UPDATE_EMPLOYEE = EMPLOYEES_URI + "/update";
const DELETE_EMPLOYEE = EMPLOYEES_URI + "/delete";

const token = Cookies.get("jwt-token");
const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const EmployeeService = {

    getEmployees() {
        return axios.get(GET_ALL_URI,  {headers: { Authorization: `Bearer ${token}` }});
    },

    getEmployeeById(employeeId: number | undefined) {
        return axios.get(GET_BY_ID, {
            params: { id: employeeId },
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    createEmployee(employee: Employee | undefined) {
        return axios.post(
            CREATE_EMPLOYEE,
            {
                firstName: employee?.firstName,
                lastName: employee?.lastName,
                gender: employee?.gender,
                birthDate: employee?.birthDate,
                email: employee?.email,
                startDate: employee?.startDate,
                endDate: employee?.endDate,
                department: { id: employee?.department },
                position: { id: employee?.position },
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
    },

    updateEmployee(
        employeeId: number | undefined,
        updatedEmployee: any | undefined
    ) {
        return axios.put(
            UPDATE_EMPLOYEE,
            {
                firstName: updatedEmployee?.firstName,
                lastName: updatedEmployee?.lastName,
                gender: updatedEmployee?.gender,
                birthDate: updatedEmployee?.birthDate,
                email: updatedEmployee?.email,
                startDate: updatedEmployee?.startDate,
                endDate: updatedEmployee?.endDate,
                department: { id: updatedEmployee?.department.id },
                position: { id: updatedEmployee?.department.id },
            },
            {
                params: { id: employeeId },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },

    filterEmployee(employeeFirstName: String) {
        return axios.get(
            EMPLOYEE_API_BASE_URL + "/findName/" + employeeFirstName,
            config
        );
    },

    deleteEmployee(employeeId: number | undefined) {
        return axios.delete(DELETE_EMPLOYEE, {
            params: { id: employeeId },
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default EmployeeService;
