import CertificateEmployee from "./CertificateEmployeeModel";
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
    departmentCode?: string
    positionCode?: string
    project?: Project[]
    certificateEmployee?: CertificateEmployee[]
}

export default Employee;