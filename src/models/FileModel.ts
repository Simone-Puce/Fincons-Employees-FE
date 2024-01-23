import Employee from "./EmployeeModel"

interface FileModel {
    id: number,
    file64: string,
    name: string,
    extension: string,
    description: string
    employeeId: Employee
}

export default FileModel;