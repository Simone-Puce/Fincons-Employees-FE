import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CertificateEmployee from "../../models/CertificateEmployeeModel";
import CertificateEmployeeService from "../../services/CertificateEmployeeService";
import Certificate from "../../models/CertificateModel";
import CertificateService from "../../services/CertificateService";
import { ScaleLoader } from "react-spinners";
import Utils from "../../utils/Utils";

const CreateCertificateEmployeeForm = () => {
  const [certificateEmployee, setCertificateEmployee] = useState<CertificateEmployee>();
  const [certificates, setCertificates] = useState<any>()
  const [showSpinner, setShowSpinner] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [isDateValid, setIsDateValid] = useState<boolean>(false)
  const [isCertificateValid, setIsCertificateValid] = useState<boolean>(false)
  const { id } = useParams();
  const idEmployee = parseInt(id!);

  const navigate = useNavigate();

  useEffect(() => {
    setShowSpinner(true)
    setTimeout(() => {
      setShowSpinner(false)
    }, 1000)
  }, [])

  useEffect(() => {
    checkSubmit()
  }, [
    isButtonDisabled,
    isDateValid,
    isCertificateValid
  ])

  const checkSubmit = () => {
    if (
      isDateValid === false ||
      isCertificateValid === false
    ) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }

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
    <>
      {
        showSpinner ? (
          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='spinner-container'>
              <ScaleLoader color="#000000" loading={true} />
            </div>
          </div>
        ) : (
          <div className="createContainer mt-5 pt-5">
            <div className="container">
              <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                  <h3 className="text-center"> Add Certificate </h3>
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
                            setIsCertificateValid(Utils.valideField(e.target.value))
                          }}
                        >
                        <option>{"Select the certificate"}</option>
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
                            setIsDateValid(Utils.valideField(e.target.value))
                          }}
                        ></input>
                      </div>
                      <div className="d-flex justify-content-center mt-3">
                        <button
                          className="btn btn-success"
                          onClick={saveCertificateEmployee}
                          disabled={isButtonDisabled}
                          title={isButtonDisabled ? "some fields are not  or empty, please check the values" : ""}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ marginLeft: "10px" }}
                          onClick={goBackToList}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>)}
    </>
  );
};

export default CreateCertificateEmployeeForm;

