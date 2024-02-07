import { useEffect, useState } from "react";
import './TableHeadComponent.css'

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

interface Props {
  tableHeadList: any | undefined;
  toDisplay: string | undefined;
  tableData: any;
}

const TableHeadComponent = (props: Props) => {
  const [hiddenValue, setHiddenValue] = useState<boolean>();
  const [tableHeadValues, setTableHeadValues] = useState<string[]>();

  useEffect(() => {
    if (props.tableHeadList === undefined || props.tableHeadList.length === 0) {
      setHiddenValue(true)
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
          setTableHeadValues(["Name", "Salary", "Actions"]);
          break;
      }
    }
    if (props.tableData !== undefined) {
      if (props.tableData.data.length === 0) {
        setHiddenValue(true)
      }
    }
  }, [props.toDisplay, props.tableHeadList, props.tableData]);

  return (
    <thead className="backgroud-style" hidden={hiddenValue}>
      <tr className="text-center backgroud-style-header">
        {tableHeadValues?.map((tableHeadValue, index) => (
          <th className="backgroud-style" key={index}>{tableHeadValue}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeadComponent;
