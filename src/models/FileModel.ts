import Employee from "./EmployeeModel"

interface File {
    id: number,
    file64: string,
    name: string,
    extension: string,
    description: string
    employee: Employee[]
}

export default File;