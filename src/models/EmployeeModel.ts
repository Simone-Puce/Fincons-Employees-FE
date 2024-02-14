import CertificateEmployee from "./CertificateEmployeeModel";
import Department from "./DepartmentModel";
import Position from "./PositionModel";
import Project from "./ProjectModel";

interface Employee {
    ssn: string
    firstName?: string
    lastName?: string
    gender?: string
    birthDate?: Date
    email?: string
    startDate?: Date
    endDate?: Date
    department?: Department
    position?: Position
    project?: Project[]
    certificateEmployee?: CertificateEmployee[]
}

export default Employee;