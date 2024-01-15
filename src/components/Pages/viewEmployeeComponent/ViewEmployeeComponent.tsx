

import DepartmentDetails from "../../Details/DepartmentDetails";
import EmployeeDetails from "../../Details/EmployeeDetails";
import PositionDetails from "../../Details/PositionDetails";

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

interface Props {
  toDisplayList: string;
}
const ViewEmployeeComponent = (props: Props) => {

  const conditionalRenderDetails = () => {
    switch (props.toDisplayList) {
      case EMPLOYEE_CASE:
        return <EmployeeDetails />;
      case DEPARTMENT_CASE:
        return <DepartmentDetails />;
      case POSITION_CASE:
        return <PositionDetails />;
    }
  };



  return <>{conditionalRenderDetails()}</>
};

export default ViewEmployeeComponent;
