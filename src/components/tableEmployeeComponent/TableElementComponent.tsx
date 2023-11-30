import React, { Key, MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import './TableElementComponent.css'
import utils from "../../utils/Utils";

type emp = {
    id: Key,
    firstName: string,
    lastName: string,
    email: string
}

type Props = {
    props: emp;
    filter: string | undefined;
    setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const TableElementComponent = (props: Props) => {
    const [employee, setEmployee] = useState({
        id: props.props.id,
        firstName: props.props.firstName,
        lastName: props.props.lastName,
        email: props.props.email
    })

    const [updateClick, setUpdateClick] = useState<boolean>(false)

    useEffect(() => {

    }, [props.filter])

    const updateButtonHandler = (e: MouseEvent, id: Key) => {
        e.preventDefault();
        if (updateClick) {
            setUpdateClick(false)
        } else {
            setUpdateClick(true)
        }
    }

    const updateEmployee = (id: Key) => {
        let idToUse = parseInt(id.toString())
        EmployeeService.updateEmployee(idToUse, {
            firstName: employee.firstName.toString(),
            lastName: employee.lastName.toString(),
            email: employee.email.toString()
        })
        setUpdateClick(false)
    }

    const changeFirstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            id: employee.id,
            firstName: e.target.value,
            lastName: employee.lastName,
            email: employee.email,
        })
    }

    const changeLastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            id: employee.id,
            firstName: employee.firstName,
            lastName: event.target.value,
            email: employee.email,
        })

    }

    const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: event.target.value
        })
    }

    function deleteButtonHandler(id: any) {
        EmployeeService.deleteEmployee(parseInt(id.toString()))
        props.setfilter("")
    }

    return (
        <tbody>
            <tr key={employee.id}>
                <td> <p hidden={updateClick} >{utils.capitalizeFirstLetter(employee.firstName)}</p><input type="text" hidden={!updateClick} value={employee.firstName} onChange={changeFirstNameHandler}></input></td>
                <td> <p hidden={updateClick} >{utils.capitalizeFirstLetter(employee.lastName)}</p><input type="text" hidden={!updateClick} value={employee.lastName} onChange={changeLastNameHandler}></input></td>
                <td> <p hidden={updateClick} >{employee.email}</p><input type="text" hidden={!updateClick} value={employee.email} onChange={changeEmailHandler}></input> </td>
                <td>
                    <div className='ButtonDiv div-style' hidden={updateClick}>
                        <button className='btn btn-info' onClick={(e) => updateButtonHandler(e, employee.id)} > <i className="bi bi-pencil-square"></i> </button>
                        <button type="button" className="btn btn-warning deleteButton" onClick={(e) => deleteButtonHandler(employee.id)}><i className="bi bi-trash3-fill"></i></button>
                        <Link to={`/view-employee/${employee.id}`}><button type="button" className="btn btn-info"><i className="bi bi-info-circle"></i></button></Link>
                    </div>
                    <div hidden={!updateClick} className="div-two-buttons">
                        <button className='btn btn-success confirmUpdateButton' onClick={(e) => updateEmployee(employee.id)}> <i className="bi bi-check-square-fill"></i> </button>
                        <button className='btn btn-danger cancelUpdateButton' onClick={(e) => updateButtonHandler(e, employee.id)}> <i className="bi bi-arrow-left-square-fill"></i></button>
                    </div>
                </td>
            </tr>
        </tbody>

    )


}
export default TableElementComponent;