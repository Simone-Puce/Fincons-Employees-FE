import CertificateEmployee from "./CertificateEmployeeModel";
import Department from "./DepartmentModel";
import File from "./FileModel";
import Position from "./PositionModel";
import Project from "./ProjectModel";

interface Employee {
    id?: number,
    firstName?: string,
    lastName?: string,
    gender?: string,
    birthDate?: Date,
    email?: string,
    startDate?: Date,
    endDate?: Date,
    department?: Department,
    position?: Position,
    project?: Project[],
    fileList?: File[]
    certificateEmployee?: CertificateEmployee[]
}

export default Employee;