import axios from "axios";
import CertificateModel from "../models/CertificateModel";
import Cookies from "js-cookie";

const CERTIFICATE_API_BASE_URL = "http://localhost:81/be/company-employee-management";
const VERSION_URI = CERTIFICATE_API_BASE_URL + "/v1";
const CERTIFICATE_URI = VERSION_URI + "/certificate";
const GET_ALL_URI = CERTIFICATE_URI + "/list";
const GET_BY_ID = CERTIFICATE_URI + "/find-by-id/id";
const CREATE_CERTIFICATE = CERTIFICATE_URI + "/add";
const UPDATE_CERTIFICATE = CERTIFICATE_URI + "/update/id";
const DELETE_CERTIFICATE = CERTIFICATE_URI + "/delete/id";

const token = Cookies.get("jwt-token");
const config = {
    headers: { Authorization: `Bearer ${token}` },
};

const CertificateService = {
    getCertificates() {
        return axios.get(GET_ALL_URI, config);
    },

    getCertificateById(certificateId: number ) {
        return axios.get(GET_BY_ID, { params: { id: certificateId }, headers: { Authorization: `Bearer ${token}` } });
    },

    createCertificate(certificate: CertificateModel ) {
        return axios.post(CREATE_CERTIFICATE, certificate, config);
    },

    updateCertificate(certificateId: number , certificate: CertificateModel ) {
        return axios.put(UPDATE_CERTIFICATE.replace("/id", `/${certificateId}`), certificate, config);
    },

    deleteCertificate(certificateId: number) {
        return axios.delete(DELETE_CERTIFICATE.replace("/id", `/${certificateId}`), config);
    },
};

export default CertificateService;
