import Employee from "./EmployeeModel";
import Certificate from "./CertificateModel";

interface CertificateEmployee {
    id?: number,
    achieved?: Date,
    employee?: Employee,
    certificate?: Certificate
}

export default CertificateEmployee;