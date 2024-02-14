import axios from "axios";
import CertificateEmployeeModel from "../models/CertificateEmployeeModel";
import Cookies from "js-cookie";

const CERTIFICATE_EMPLOYEE_API_BASE_URL =
    "http://localhost:8080/company-employee-management";
const VERSION_URI = CERTIFICATE_EMPLOYEE_API_BASE_URL + "/v1";
const CERTIFICATE_EMPLOYEE_URI = VERSION_URI + "/certificate-employee";
const GET_ALL_URI = CERTIFICATE_EMPLOYEE_URI + "/list";
const GET_BY_ID = CERTIFICATE_EMPLOYEE_URI + "/find-by-id/id";
const CREATE_CERTIFICATE_EMPLOYEE = CERTIFICATE_EMPLOYEE_URI + "/add";
const UPDATE_CERTIFICATE_EMPLOYEE = CERTIFICATE_EMPLOYEE_URI + "/update/id";
const DELETE_CERTIFICATE_EMPLOYEE = CERTIFICATE_EMPLOYEE_URI + "/delete/id";

const token = Cookies.get("jwt-token");
const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const CertificateEmployeeService = {
    getCertificateEmployees() {
        return axios.get(GET_ALL_URI,  {headers: { Authorization: `Bearer ${token}` }});
    },

    getCertificateEmployeeById(certificateEmployeeId: number) {
        return axios.get(GET_BY_ID, {
            params: { id: certificateEmployeeId },
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    createCertificateEmployee(
        certificateEmployee: CertificateEmployeeModel,
        idEmployee: number
    ) {
        return axios.post(
            CREATE_CERTIFICATE_EMPLOYEE,
            {
                certificate: {
                    id: certificateEmployee.certificate,
                },
                employee: {
                    id: idEmployee,
                },
                achieved: certificateEmployee.achieved,
            },
            config
        );
    },

    updateCertificateEmployee(
        certificateEmployeeId: number,
        certificateEmployee: CertificateEmployeeModel
    ) {
        return axios.put(
            UPDATE_CERTIFICATE_EMPLOYEE.replace("/id", `/${certificateEmployeeId}`),
            certificateEmployee,
            config
        );
    },

    deleteCertificateEmployee(certificateEmployeeId: number) {
        return axios.delete(
            DELETE_CERTIFICATE_EMPLOYEE.replace("/id", `/${certificateEmployeeId}`),
            config
        );
    },
};

export default CertificateEmployeeService;
