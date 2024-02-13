import { useState } from 'react';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from 'react-router-dom';
import './ConfirmRegistrationModal.css'

interface Props {
  handleRegistration(): void
  disabledButton: boolean
  setDisabledButton: React.Dispatch<React.SetStateAction<boolean>>
  checkSubmit(): void
}

function ConfirmRegistrationModal(props: Props) {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const handleClose = () => setShow(false)
  
  const handleShow = () => {
    props.checkSubmit()
    props.handleRegistration()
    setShow(true)
  };

  const navigateToLogin = () => {
    navigate("/login");
  }

  return (
    <>
      <Button className="btn btn-style-registration btn-lg text-black" disabled={props.disabledButton} onClick={handleShow}>
        Register
      </Button>
      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Register user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className='row justify-content-around'>
              Registered Succesfully
              <button className='btn btn-link' onClick={navigateToLogin}>Go to login page</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConfirmRegistrationModal;