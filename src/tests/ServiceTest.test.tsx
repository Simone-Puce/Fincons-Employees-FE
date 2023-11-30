import EmployeeService from "../services/EmployeeService";

const axios = require('axios')
const employees = EmployeeService.getEmployeesById(402)

jest.mock('axios')

it("should do something",async()=>{
  axios.get.mockResolvedValue({})
  employees;
})