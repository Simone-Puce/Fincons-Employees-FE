import { useEffect, useState } from "react";


interface EmployeeExample {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };

interface Props {
    employees: EmployeeExample[] | undefined
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