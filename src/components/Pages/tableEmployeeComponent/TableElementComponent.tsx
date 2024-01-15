import React, {MouseEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../../../services/EmployeeService";
import './TableElementComponent.css'
import utils from "../../../utils/Utils";
import DepartmentService from "../../../services/DepartmentService";
import PositionService from "../../../services/PositionService";



const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

type Props = {
    tableData: any;
    filter: string | undefined;
    setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
    toDisplay: string | undefined;
};

const TableElementComponent = (props: Props) => {
    const [tableElementId, setTableElementId] = useState<string>()
    const [firstElement, setFirstElement] = useState<string>()
    const [secondElement, setSecondElemnt] = useState<string>()
    const [thirdElement, setThirdElement] = useState<string>()


    useEffect(()=>{
        console.log(props.tableData, "beforeSetData")
        switch(props.toDisplay){
            case EMPLOYEE_CASE:
                setTableElementId(props.tableData.id)
                setFirstElement(props.tableData.firstName)
                setSecondElemnt(props.tableData.lastName)
                setThirdElement(props.tableData.email)
                break;
            case DEPARTMENT_CASE:
                setTableElementId(props.tableData.id)
                setFirstElement(props.tableData.name)
                setSecondElemnt(props.tableData.address)
                setThirdElement(props.tableData.city)
                break;
            case POSITION_CASE:
                setTableElementId(props.tableData.id)
                setFirstElement(props.tableData.name.toString())
                setSecondElemnt(props.tableData.salary.toString())
                setThirdElement(props.tableData.salary.toString())
                break;
        }
    },[props.toDisplay])

    useEffect(() => {

    }, [props.filter])

    const deleteButtonHandler = (id: string | undefined) => {
        switch(props.toDisplay){
            case EMPLOYEE_CASE:
                EmployeeService.deleteEmployee(parseInt(id!));
                break;
            case DEPARTMENT_CASE:
                DepartmentService.deleteDepartment(parseInt(id!));
                break;
            case POSITION_CASE:
                PositionService.deletePosition(parseInt(id!))
                break;
        }
        props.setfilter("")
    }

    return (
        <>
        <tbody>
            <tr key={tableElementId}>
                <td> {utils.capitalizeFirstLetter(firstElement)}</td>
                <td> {utils.capitalizeFirstLetter(secondElement)}</td>
                <td> {thirdElement}</td>
                <td>
                    <div className='ButtonDiv div-style'>
                        <Link to={`/update-employee/${tableElementId}` }><button className='btn btn-info'> <i className="bi bi-pencil-square"></i> </button></Link>
                        <button type="button" className="btn btn-warning deleteButton" onClick={(e) => deleteButtonHandler(tableElementId)}><i className="bi bi-trash3-fill"></i></button>
                        <Link to={`/view-employee/${tableElementId}`}><button type="button" className="btn btn-info"><i className="bi bi-info-circle"></i></button></Link>
                    </div>
                </td>
            </tr>
        </tbody>
    
    </>

    )


}
export default TableElementComponent;