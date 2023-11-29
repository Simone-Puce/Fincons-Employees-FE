import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService{
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee: { firstName: String; lastName: String; email: String; }){
        return axios.post(EMPLOYEE_API_BASE_URL,employee)
    }

    getEmployeesById(employeeId: Number | undefined){
        return axios.get(EMPLOYEE_API_BASE_URL+'/'+employeeId)
    }

    updateEmployee(employeeId: Number | undefined, employee: { firstName: string; lastName: string; email: string; }){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId,employee)
    }

    filterEmployee(employeeFirstName: String){
        return axios.get(EMPLOYEE_API_BASE_URL+'/findName/'+employeeFirstName)
    }

    deleteEmployee(employeeId: Number){
        return axios.delete(EMPLOYEE_API_BASE_URL+"/"+employeeId)
    }
}

const employeeService = new EmployeeService();

export default employeeService;