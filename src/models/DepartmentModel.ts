import Employee from "./EmployeeModel";



interface Department {
    name: string,
    address: string,
    city: string,
    Employees: Employee[]
}

export default Department;