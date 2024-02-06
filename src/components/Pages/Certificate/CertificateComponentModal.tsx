import React, { useState, useEffect } from 'react';
import CertificateService from '../../../services/CertificateService';
import Certificate from '../../../models/CertificateModel';
import CertificateEmployeeService from '../../../services/CertificateEmployeeService';
import CertificateEmployee from '../../../models/CertificateEmployeeModel';
import Employee from '../../../models/EmployeeModel';
import EmployeeService from '../../../services/EmployeeService';
import { Link } from 'react-router-dom';
import './CertificateComponentModal.css'

interface Props {
    idEmployee: number;

}

const CertificateComponent = (props: Props) => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [employee, setEmployee] = useState<Employee>();
    const [certificateEmployees, setCertificateEmployees] = useState<CertificateEmployee[]>([]);

    useEffect(() => {
        CertificateService.getCertificates().then((res) => {
            setCertificates(res.data);
        });
        CertificateEmployeeService.getCertificateEmployees().then((res) => {
            setCertificateEmployees(res.data)
        });
        EmployeeService.getEmployees().then((res) => {
            setEmployee(res.data)
        })
    }, []);

    const handleDelete = (id: number | undefined) => {
        CertificateEmployeeService.deleteCertificateEmployee(id!).then((res) => {
            setCertificateEmployees(certificateEmployees.filter((certificateEmployee) => certificateEmployee.id !== id));
        });
    }

    const checkCertificateEmployee = (certificateEmployee: CertificateEmployee) => {
        if (certificateEmployee.employee?.id === props.idEmployee) {
            return (
                <tbody className='backgroud-style'>
                    <tr className='backgroud-style align-middle'>
                        <td className='text-center backgroud-style align-middle' key={certificateEmployee.id}>{certificateEmployee.certificate?.name}</td>
                        <td className='text-center backgroud-style align-middle' key={certificateEmployee.id}>{certificateEmployee.achieved?.toString()}</td>
                        <td className='text-center backgroud-style '>
                            <button onClick={() => handleDelete(certificateEmployee.id)} className="btn btn-background">
                                <i className="bi bi-trash3-fill"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            )

        }
    }

    return (
        <div className='m-2'>
            <div className='d-flex justify-content-center'>
                <Link to={`/add/${props.idEmployee}`}>
                    <button className="btn rounded-pill btn-background mb-3 button-text" >
                        <i
                            className="bi bi-person-fill-add"
                            style={{ paddingRight: 5 }}
                        ></i>
                        <span>Add certificate</span>
                    </button>
                </Link>
            </div>
            <div className='d-flex justify-content-center'>
                <div className='row table-style'>
                    <table className="table table-striped mb-0 " hidden={certificateEmployees.length === 0 ? true : false}>
                        <thead className="backgroud-style">
                            <tr className='text-center backgroud-style-header'>
                                <th className='backgroud-style'>Name</th>
                                <th className='backgroud-style'>Achieved</th>
                                <th className='backgroud-style'>Actions</th>
                            </tr>
                        </thead>
                        {certificateEmployees.map((certificateEmployee) => (
                            <>
                                {checkCertificateEmployee(certificateEmployee)}
                            </>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CertificateComponent;