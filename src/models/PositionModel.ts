import EmployeeModel from "./EmployeeModel";

interface Position {
    name: string,
    salary: number,
    employees: EmployeeModel[]
}

export default Position;