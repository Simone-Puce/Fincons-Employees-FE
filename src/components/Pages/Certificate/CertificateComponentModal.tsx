import React, { useState, useEffect } from 'react';
import CertificateService from '../../../services/CertificateService';
import Certificate from '../../../models/CertificateModel';
import CertificateEmployeeService from '../../../services/CertificateEmployeeService';
import CertificateEmployee from '../../../models/CertificateEmployeeModel';
import Employee from '../../../models/EmployeeModel';
import EmployeeService from '../../../services/EmployeeService';
import { Link } from 'react-router-dom';

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
            console.log(res.data)
        });
        CertificateEmployeeService.getCertificateEmployees().then((res) => {
            setCertificateEmployees(res.data)
            console.log(res.data)
        });
        EmployeeService.getEmployees().then((res) => {
            setEmployee(res.data)
            console.log(res.data)
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
                <tbody className='border-1'>
                    <tr className='text-center'>
                        <td key={certificateEmployee.id}>{certificateEmployee.certificate?.name}</td>
                        <td key={certificateEmployee.id}>{certificateEmployee.achieved?.toString()}</td>
                        <td>
                            <button onClick={() => handleDelete(certificateEmployee.id)} className="btn btn-warning delete-button"><i className="bi bi-trash3-fill"></i></button>
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
                    <button className="btn rounded-pill btn-primary " >
                        <i
                            className="bi bi-person-fill-add"
                            style={{ paddingRight: 5 }}
                        ></i>
                        Add certificate
                    </button>
                </Link>
            </div>
            <div className='d-flex justify-content-center'>
            <table hidden={certificateEmployees.length === 0 ? true : false }>
                <thead>
                    <tr className='text-center'>
                        <th>Name</th>
                        <th>Achieved</th>
                        <th>Actions</th>
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
    );
};

export default CertificateComponent;