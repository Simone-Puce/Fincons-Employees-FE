import EmployeeModel from "./EmployeeModel";

interface Position {
    id: number,
    name: string,
    salary: number,
    employees: EmployeeModel[]
}

export default Position;