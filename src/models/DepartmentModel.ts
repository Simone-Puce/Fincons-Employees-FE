import Employee from "./EmployeeModel";

interface Department {
    id?: number,
    name: string,
    address: string,
    city: string,
    Employees: Employee[]
}

export default Department;