import { useEffect, useState } from "react";

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

interface Props {
  tableHeadList: any | undefined;
  toDisplay: string | undefined;
}

const TableHeadComponent = (props: Props) => {
  const [hiddenValue, setHiddenValue] = useState<boolean>();
  const [tableHeadValues, setTableHeadValues] = useState<string[]>();

  useEffect(() => {
    if (props.tableHeadList === undefined || props.tableHeadList.length === 0) {
      setHiddenValue(true);
    } else {
      setHiddenValue(false);
      switch (props.toDisplay) {
        case EMPLOYEE_CASE:
          setTableHeadValues(["First name", "Last name", "Email", "Actions"]);
          break;
        case DEPARTMENT_CASE:
          setTableHeadValues(["Name", "Address", "City", "Actions"]);
          break;
        case POSITION_CASE:
          setTableHeadValues(["Name", "Salary", "idk", "Actions"]);
          break;
      }
    }
  },[]);

  return (
    <thead hidden={hiddenValue}>
      <tr>
        {tableHeadValues?.map((tableHeadValue) => (
          <th>{tableHeadValue}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadComponent;
