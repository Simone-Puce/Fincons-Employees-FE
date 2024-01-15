import { useEffect } from "react";
import CreateEmployeeForm from "../../Forms/CreateEmployeeForm";
import CreateDepartmentForm from "../../Forms/CreateDepartmentsForm";
import CreatePositionForm from "../../Forms/CreatePositionForm";

const EMPLOYEE_CASE = "employees";
const DEPARTMENT_CASE = "departments";
const POSITION_CASE = "positions";

interface Props {
  toDisplayList: string;
}

const CreateUpdateEmployeeComponent = (props: Props) => {
  useEffect(() => {}, [props.toDisplayList]);

  const conditionalRenderCreateForm = () => {
    switch (props.toDisplayList) {
      case EMPLOYEE_CASE:
        return <CreateEmployeeForm />;
      case DEPARTMENT_CASE:
        return <CreateDepartmentForm />;
      case POSITION_CASE:
        return <CreatePositionForm />;
    }
  };

  return <>{conditionalRenderCreateForm()}</>;
};

export default CreateUpdateEmployeeComponent;
