import axios from "axios";
import CertificateEmployeeModel from "../models/CertificateEmployeeModel";

const CERTIFICATE_EMPLOYEE_API_BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = CERTIFICATE_EMPLOYEE_API_BASE_URL + "/v1";
const CERTIFICATE_EMPLOYEE_URI = VERSION_URI + "/certificate-employee";
const GET_ALL_URI = CERTIFICATE_EMPLOYEE_URI + "/list";
const GET_BY_ID = CERTIFICATE_EMPLOYEE_URI + "/find-by-id/id";
const CREATE_CERTIFICATE_EMPLOYEE = CERTIFICATE_EMPLOYEE_URI + "/add";
const UPDATE_CERTIFICATE_EMPLOYEE = CERTIFICATE_EMPLOYEE_URI + "/update/id";
const DELETE_CERTIFICATE_EMPLOYEE = CERTIFICATE_EMPLOYEE_URI + "/delete/id";

const CertificateEmployeeService = {
    getCertificateEmployees() {
        return axios.get(GET_ALL_URI);
    },

    getCertificateEmployeeById(certificateEmployeeId: number ) {
        return axios.get(GET_BY_ID, { params: { id: certificateEmployeeId } });
    },

    createCertificateEmployee(certificateEmployee: CertificateEmployeeModel , idEmployee: number) {
        console.log(certificateEmployee.certificate, " ++ looking certificate employee")
        return axios.post(CREATE_CERTIFICATE_EMPLOYEE,{
            certificate: {
                id: certificateEmployee.certificate
            },
            employee : {
                id: idEmployee
            },
            achieved : certificateEmployee.achieved
        });
    },

    updateCertificateEmployee(certificateEmployeeId: number , certificateEmployee: CertificateEmployeeModel ) {
        return axios.put(UPDATE_CERTIFICATE_EMPLOYEE.replace("/id", `/${certificateEmployeeId}`), certificateEmployee);
    },

    deleteCertificateEmployee(certificateEmployeeId: number) {
        return axios.delete(DELETE_CERTIFICATE_EMPLOYEE.replace("/id", `/${certificateEmployeeId}`));
    },
};

export default CertificateEmployeeService;
