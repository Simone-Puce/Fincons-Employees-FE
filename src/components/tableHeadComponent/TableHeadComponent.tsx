import { useEffect, useState } from "react";
import EmployeeModel from "../../models/EmployeeModel";

interface Props {
    employees: EmployeeModel[] | undefined
};

const TableHeadComponent = (props: Props) => {
    
    const [hiddenValue, setHiddenValue] = useState<boolean>()

    useEffect(()=>{
        if(props.employees === undefined || props.employees.length === 0){
            setHiddenValue(true)
        }else{
            setHiddenValue(false)
        }
    })
    
    return (
        <thead hidden={hiddenValue}>
              <tr>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email</th>
                <th>Actions</th>
              </tr>
            </thead>
    )
}

export default TableHeadComponent;