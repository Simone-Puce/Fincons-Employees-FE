import React, {MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import './TableElementComponent.css'
import utils from "../../utils/Utils";
import Employee from "../../models/EmployeeModel";

type Props = {
    props: Employee;
    filter: string | undefined;
    setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const TableElementComponent = (props: Props) => {
    const [employee, setEmployee] = useState<Employee>()
    const [updateClick, setUpdateClick] = useState<boolean>(false)

    useEffect(()=>{
        setEmployee(props.props)
    },[])

    useEffect(() => {

    }, [props.filter])

    const updateButtonHandler = (e: MouseEvent, id: number | undefined) => {
        e.preventDefault();
        /*if (updateClick) {
            setUpdateClick(false)
        } else {
            setUpdateClick(true)
        }*/
    }

   const updateEmployee = (id: number | undefined) => {
        console.log(id)
    }

    function deleteButtonHandler(id: number | undefined) {
        EmployeeService.deleteEmployee(id)
        props.setfilter("")
    }

    return (
        <tbody>
            <tr key={employee?.id}>
                <td> <p hidden={updateClick} >{utils.capitalizeFirstLetter(employee?.firstName)}</p><input type="text" hidden={!updateClick} value={employee?.firstName} /*onChange={changeFirstNameHandler}*/></input></td>
                <td> <p hidden={updateClick} >{utils.capitalizeFirstLetter(employee?.lastName)}</p><input type="text" hidden={!updateClick} value={employee?.lastName} /*onChange={changeLastNameHandler}*/></input></td>
                <td> <p hidden={updateClick} >{employee?.email}</p><input type="text" hidden={!updateClick} value={employee?.email} /*onChange={changeEmailHandler}*/></input> </td>
                <td>
                    <div className='ButtonDiv div-style' hidden={updateClick}>
                        <Link to={`/update-employee/${employee?.id}` }><button className='btn btn-info'> <i className="bi bi-pencil-square"></i> </button></Link>
                        <button type="button" className="btn btn-warning deleteButton" onClick={(e) => deleteButtonHandler(employee?.id)}><i className="bi bi-trash3-fill"></i></button>
                        <Link to={`/view-employee/${employee?.id}`}><button type="button" className="btn btn-info"><i className="bi bi-info-circle"></i></button></Link>
                    </div>
                    {/*<div hidden={!updateClick} className="div-two-buttons">
                        <button className='btn btn-success confirmUpdateButton' onClick={(e) => updateEmployee(employee?.id)}> <i className="bi bi-check-square-fill"></i> </button>
                        <button className='btn btn-danger cancelUpdateButton' onClick={(e) => updateButtonHandler(e, employee?.id)}> <i className="bi bi-arrow-left-square-fill"></i></button>
    </div> */   }
                </td>
            </tr>
        </tbody>

    )


}
export default TableElementComponent;