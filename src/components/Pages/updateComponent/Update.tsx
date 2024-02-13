
import UpdateEmployee from "../../Forms/UpdateEmployeeForm";
import UpdateDepartment from "../../Forms/UpdateDepartmentForm";
import UpdatePosition from "../../Forms/UpdatePositionForm";

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

interface Props {
  toDisplayList: string;
}

const Update = (props: Props) => {

  const conditionalRenderUpdateForm = () => {
    switch (props.toDisplayList) {
      case EMPLOYEE_CASE:
        return <UpdateEmployee />
      case DEPARTMENT_CASE:
        return <UpdateDepartment />
      case POSITION_CASE:
        return <UpdatePosition />
    }
  }

  return <>{conditionalRenderUpdateForm()}</>;
}

export default Update;
