import CreateEmployeeForm from "../../Forms/CreateEmployeeForm";
import CreateDepartmentForm from "../../Forms/department/CreateDepartmentForm";
import CreatePositionForm from "../../Forms/CreatePositionForm";

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

interface Props {
  toDisplayList: string;
}

const CreateUpdateEmployeeComponent = (props: Props) => {

  const conditionalRenderCreateForm = () => {
    switch (props.toDisplayList) {
      case EMPLOYEE_CASE:
        return <CreateEmployeeForm />
      case DEPARTMENT_CASE:
        return <CreateDepartmentForm />
      case POSITION_CASE:
        return <CreatePositionForm />
    }
  }

  return <>{conditionalRenderCreateForm()}</>;
}

export default CreateUpdateEmployeeComponent;
