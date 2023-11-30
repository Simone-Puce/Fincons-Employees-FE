import axios from "axios";
import EmployeeService from "../services/EmployeeService";

jest.mock('axios');

it("should return success if the employee list is empty" ,async() => {
  const mockResponse = {
    data: {},
  };
  
  axios.get = jest.fn().mockResolvedValue(mockResponse)
  let employees;
  let tempData = await axios.get("http://localhost:8080/api/v1/employees").then(res=>{employees=res.data})
  console.log(tempData)

  let temp = EmployeeService.getEmployees().then(res=>console.log(res.data))
  expect(mockResponse.data).toEqual(employees)
  //expect(temp).toHaveBeenCalled();
});
