import EmployeeModel from "./EmployeeModel";

interface Position {
    positionCode: string
    name: string,
    salary: number,
    employees: EmployeeModel[]
}

export default Position;