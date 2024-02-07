import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CertificateEmployee from "../../models/CertificateEmployeeModel";
import CertificateEmployeeService from "../../services/CertificateEmployeeService";
import Certificate from "../../models/CertificateModel";
import CertificateService from "../../services/CertificateService";
import './Styles/FormStyles.css'

const CreateCertificateEmployeeForm = () => {
  const [certificateEmployee, setCertificateEmployee] = useState<CertificateEmployee>();
  const [certificates, setCertificates] = useState<any>()
  const { id } = useParams();
  const idEmployee = parseInt(id!);

  const navigate = useNavigate();

  const goBackToList = () => {
    navigate("/view-employee/" + idEmployee);
  };

  useEffect(() => {
    CertificateService.getCertificates().then((res) => {
      setCertificates(res.data);
    })
  }, []);

  const saveCertificateEmployee = () => {

    CertificateEmployeeService.createCertificateEmployee(certificateEmployee!, idEmployee);
    navigate("/view-employee/" + idEmployee);
  };


  return (
    <div className="createContainer mt-5 pt-5 footer-manager">
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3 create-card-style">
            <h3 className="text-center pt-2"> Add Certificate </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Certificate</label>
                  <select
                    name="certificate"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setCertificateEmployee({
                        ...certificateEmployee!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  >
                    <option selected>Select the certificate</option>
                    {certificates?.map((certificate: Certificate) => {
                      return (
                        <option value={certificate.id}>{certificate.name}</option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Achieved</label>
                  <input
                    type="date"
                    placeholder="achieved"
                    name="achieved"
                    className="form-control"
                    onChange={(e) => {
                      setCertificateEmployee({
                        ...certificateEmployee!,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  ></input>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <div className="d-flex justify-content-evenly w-50 mt-3">
                    <button
                      className="btn btn-save w-25"
                      onClick={saveCertificateEmployee}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-cancel w-25 ml-2"
                      onClick={goBackToList}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificateEmployeeForm;

