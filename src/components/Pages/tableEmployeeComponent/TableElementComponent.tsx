import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    setTableData: React.Dispatch<React.SetStateAction<any | undefined>>
    filter: string | undefined;
    setfilter: React.Dispatch<React.SetStateAction<string | undefined>>;
    toDisplay: string | undefined;
};

const TableElementComponent = (props: Props) => {
    const [tableElementId, setTableElementId] = useState<string>()
    const [firstElement, setFirstElement] = useState<string>()
    const [secondElement, setSecondElemnt] = useState<string>()
    const [thirdElement, setThirdElement] = useState<string>()
    const [isPositionSelected, setIsPositionSelected] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const navigate = useNavigate()


    useEffect(() => {
        switch (props.toDisplay) {
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
                break;
        }
    }, [props.toDisplay, props.setfilter, props])

    useEffect(() => {
        if (props.toDisplay === POSITION_CASE) {
            setIsPositionSelected(true)
        } else {
            setIsPositionSelected(false)
        }
    }, [props.tableData, props.toDisplay])

    useEffect(() => {
        if (props.toDisplay === DEPARTMENT_CASE) {
            if (props.tableData.employees.length > 0) {
                setIsButtonDisabled(true)
            }
        }
        if (props.toDisplay === POSITION_CASE) {
            EmployeeService.getEmployees().then((res: any) => {
                if (Array.isArray(res.data.data)) {
                    res.data.data.map((singleData: any) => {
                        if (singleData.position.name === props.tableData.name) {
                            setIsButtonDisabled(true)
                        }
                        return null;
                    })
                }
            })
        }
    }, [props.toDisplay, props.tableData])

    const deleteButtonHandler = (id: string | undefined) => {
        switch (props.toDisplay) {
            case EMPLOYEE_CASE:
                EmployeeService.deleteEmployee(parseInt(id!))
                navigate("/spinner")
                break;
            case DEPARTMENT_CASE:
                DepartmentService.deleteDepartment(parseInt(id!));
                navigate("/spinner")
                break;
            case POSITION_CASE:
                PositionService.deletePosition(parseInt(id!))
                navigate("/spinner")
                break;
        }
        props.setfilter("")
    }

    return (
        <>
            <tbody>
                <tr key={tableElementId}>
                    <td className="text-center"> {utils.capitalizeFirstLetter(firstElement)}</td>
                    <td className="text-center"> {utils.capitalizeFirstLetter(secondElement)}</td>
                    <td hidden={isPositionSelected} className="text-center"> {thirdElement}</td>
                    <td className="text-center">
                        <div className='ButtonDiv div-style'>
                            <Link to={`/update-employee/${tableElementId}`}><button className='btn btn-info'> <i className="bi bi-pencil-square"></i> </button></Link>
                            <button type="button" title={isButtonDisabled ? "this can't be deleted" : ""} className="btn btn-warning delete-button" disabled={isButtonDisabled} onClick={(e) => deleteButtonHandler(tableElementId)}><i className="bi bi-trash3-fill"></i></button>
                            <Link to={`/view-employee/${tableElementId}`}><button type="button" className="btn btn-info"><i className="bi bi-info-circle"></i></button></Link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </>
    )


}
export default TableElementComponent;