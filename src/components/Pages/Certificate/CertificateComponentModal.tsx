import React, { useState, useEffect } from 'react';
import CertificateEmployeeService from '../../../services/CertificateEmployeeService';
import CertificateEmployee from '../../../models/CertificateEmployeeModel';
import { Link } from 'react-router-dom';
import './CertificateComponentModal.css'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import LoginRegistrationService from '../../../services/LoginRegistrationService';

interface Props {
    idEmployee: number;
}

const CertificateComponent = (props: Props) => {
    const [certificateEmployees, setCertificateEmployees] = useState<CertificateEmployee[]>([]);
    const [userHiddenButtons, setUserHiddenButtons] = useState<boolean>()
    const [tableHiddenHandler, setTableHiddenHandler] = useState<boolean>()

    useEffect(() => {
        CertificateEmployeeService.getCertificateEmployees().then((res) => {
            setCertificateEmployees(res.data)
            const employeeCertificates = res.data.filter((certificate: any) => certificate.employee?.id === props.idEmployee)
            if (employeeCertificates.length === 0) {
                setTableHiddenHandler(true)
            } else {
                setTableHiddenHandler(false)
            }
        });
    }, [props.idEmployee])

    useEffect(() => {
        const jwt = Cookies.get("jwt-token")
        const user = jwtDecode(jwt!)
        LoginRegistrationService.getUserDetails(user.sub).then((res) => {
            if (res.data.data.roles[0].name === 'ROLE_ADMIN') {
                setUserHiddenButtons(false)
            }
            if (res.data.data.roles[0].name === 'ROLE_USER') {
                setUserHiddenButtons(true)
            }
        })
    }, [])

    const handleDelete = (id: number | undefined) => {
        CertificateEmployeeService.deleteCertificateEmployee(id!)
        const newCertificateEmployees = certificateEmployees.filter((certificate) => certificate?.id !== id!)
        setCertificateEmployees(newCertificateEmployees)
        if (newCertificateEmployees.length === 0) {
            setTableHiddenHandler(true)
        } else {
            setTableHiddenHandler(false)
        }
    }

    const checkCertificateEmployee = (certificateEmployee: CertificateEmployee) => {
        if (certificateEmployee.employee?.id === props.idEmployee) {
            return (
                <tbody className='backgroud-style'>
                    <tr className='backgroud-style align-middle'>
                        <td className='text-center backgroud-style align-middle'>{certificateEmployee.certificate?.name}</td>
                        <td className='text-center backgroud-style align-middle'>{certificateEmployee.achieved?.toString()}</td>
                        <td hidden={userHiddenButtons} className='text-center backgroud-style '>
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
                    <button hidden={userHiddenButtons} className="btn rounded-pill btn-background mb-3 button-text" >
                        <i
                            className="bi bi-person-fill-add"
                            style={{ paddingRight: 5 }}
                        ></i>
                        <span>Add certificate</span>
                    </button>
                </Link>
            </div>
            <div className='d-flex justify-content-center' hidden={tableHiddenHandler}>
                <div className='row table-style' hidden={tableHiddenHandler}>
                    <table className="table table-striped mb-0">
                        <thead className="backgroud-style">
                            <tr className='text-center backgroud-style-header'>
                                <th className='backgroud-style'>Name</th>
                                <th className='backgroud-style'>Achieved</th>
                                <th hidden={userHiddenButtons} className='backgroud-style'>Actions</th>
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
    )
}

export default CertificateComponent;