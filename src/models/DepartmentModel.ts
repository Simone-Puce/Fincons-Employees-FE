import Employee from "./EmployeeModel";

interface Department {
    departmentCode: string,
    name: string,
    address: string,
    city: string,
    Employees: Employee[]
}

export default Department;