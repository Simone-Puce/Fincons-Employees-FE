import Employee from "./EmployeeModel";

interface Project {
    name: string,
    area: string,
    priority: string,
    employees: Employee[]
}

export default Project;