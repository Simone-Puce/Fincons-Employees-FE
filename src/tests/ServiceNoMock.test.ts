import axios from "axios";
import EmployeeService from "../services/EmployeeService";

let employees: [];
EmployeeService.getEmployees().then((res)=>{
})

it("should pass if the list is not empty record",async()=>{
   await expect(employees).not.toBeNull()
})