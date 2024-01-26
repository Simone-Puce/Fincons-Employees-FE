import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import ImportEmployeeFileService from '../../../services/ImportEmployeeFileService';

const ImportFileComponent = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [response, setResponse] = useState([]);
  const [executionId, setExecutionId] = useState('');
  const [status, setStatus] = useState('');
  const [filename, setFileName] = useState('');
  const [filesize, setFileSize] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = new FormData();

    console.log(e.target.files && e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      newFormData.append('importedFile', e.target.files[0]);
      setFormData(newFormData);
      setFileUploaded(true);
    } else {
      setFileUploaded(false);
      setFileName('');
      setFileSize('');
      setStatus('');
    }
  };

  const submitFileData = async () => {

    console.log("Sto inviando il file");
    ImportEmployeeFileService.importFile(formData)
      .then(response => {
        console.log(response);

        // Accedi ai campi della risposta
        setExecutionId(response.data.executionId);
        setStatus(response.data.status);
        setFileName(response.data.filename);
        setFileSize(response.data.fileSize);
        setStartDate(response.data.startProcessingDate);
        setEndDate(response.data.endProcessingDate);
        //response.data.errors;

        // Ora puoi utilizzare queste variabili come necessario
        console.log("L'id dell'esecuzione è: " + executionId, "Lo stato è:" + status, "Nome del file:" + filename, filesize, startDate, endDate);
        setResponse(response.data);

      })
      .catch(error => console.log(error))

  };


  return (

    <>
      <div className="d-flex align-items-center justify-content-center" style={{ marginTop: 50 }}>
        <p>Import Employee From '.csv' or '.xlsx' file</p>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
          
          <input type='file' name="file-upload" onChange={onFileChange} />
          
          <div style={{ marginTop: 20 }}>
            <button onClick={submitFileData} disabled={!fileUploaded}>Upload</button>
          </div>
        </form>   
      </div>

      <div className='align-items-center'>     
          <p>File: {filename}</p>
          <p>Size: {filesize}</p>
          <p>Status: {status}</p>
        </div>
    </>
  );
}


export default ImportFileComponent;