import { useEffect } from "react";
import CreateEmployeeForm from "../../Forms/CreateEmployeeForm";

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
        return <CreateEmployeeForm />;
      case POSITION_CASE:
        return <CreateEmployeeForm />;
    }
  };

  return <>{conditionalRenderCreateForm()}</>;
};

export default CreateUpdateEmployeeComponent;
