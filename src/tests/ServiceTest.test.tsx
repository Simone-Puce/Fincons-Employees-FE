import employeeService from "../services/EmployeeService";

const axios = require('axios')

jest.mock('axios')

it("should return true because list is not empty",async()=>{
  axios.get.mockResolvedValue(
    {
      data:[
        {
          id:1,
          firstName:'simone',
          lastName:'puce',
          email:'simonepuce@gmail.com'
        },
        {
          id:2,
          firstName:'chiara',
          lastName:'basile',
          email:'chiarabasile@gmail.com'
        }
      ]
    }
  )
  const employees = await employeeService.getEmployees();
  expect(employees).not.toEqual([{}])
})

