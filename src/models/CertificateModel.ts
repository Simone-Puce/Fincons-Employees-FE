import CertificateEmployee from "./CertificateEmployeeModel";

interface Certificate {
    id?: number,
    name?: string,
    activate?: boolean,
    certificateEmployee?: CertificateEmployee[]
}

export default Certificate;