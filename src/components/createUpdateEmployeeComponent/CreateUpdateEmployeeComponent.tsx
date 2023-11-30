import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import EmployeeService from "../../services/EmployeeService";
import React from "react";

const CreateUpdateEmployeeComponent = () => {
    const [employee, setEmployee] = useState({ firstName: "", lastName: "", email: "" });
    const [formNames, setFormNames] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setFormNames('Add')
    }, [])

    const saveOrUpdateEmployee = () => {
        EmployeeService.createEmployee(employee)
        navigate("/employees")
    }

    const backToList = () => [
        navigate("/Employees")
    ]

    const changeFirstNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            firstName: e.target.value,
            lastName: employee.lastName,
            email: employee.email,
        })
    }

    const changeLastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            firstName: employee.firstName,
            lastName: event.target.value,
            email: employee.email,
        })

    }

    const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: event.target.value
        })
    }

    return (
        <div className="createContainer mt-5 pt-5">
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h3 className='text-center'> {formNames} employee </h3>
                        <div className='card-body'>
                            <form>
                                <div className='form-group'>
                                    <label>First name</label>
                                    <input placeholder='First name' name='firstName' className='form-control' value={employee.firstName || ''} onChange={changeFirstNameHandler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Last name</label>
                                    <input placeholder='Last name' name='lastName' className='form-control' value={employee.lastName || ''} onChange={changeLastNameHandler}></input>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email</label>
                                    <input placeholder='Email address' name='email' className='form-control' value={employee.email || ''} onChange={changeEmailHandler}></input>
                                </div>
                                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Save</button>
                                <button className='btn btn-danger' style={{ marginLeft: "10px" }} onClick={backToList}> Cancel </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateUpdateEmployeeComponent;