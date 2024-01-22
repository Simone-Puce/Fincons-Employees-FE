/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import './Spinner.css'

const SpinnerComponent = () => {

    const navigate = useNavigate()
    const [showSpinner, setShowSpinner] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShowSpinner(false)
            navigate("/employees")
        }, 1)
    }, [])

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='spinner-container'>
           {
            showSpinner ? 
                ( 
                    <ScaleLoader color="#000000" loading={true} /> 
                ) : (
                    <></>
                )
           }
        </div>
    </div>
    )
}

export default SpinnerComponent;