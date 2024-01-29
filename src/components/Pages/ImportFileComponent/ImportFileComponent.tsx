import React, { useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import ImportEmployeeFileService from '../../../services/ImportEmployeeFileService';
import backgroundUploadImage from './assets/images/file-upload.png';
import csvLogo from './assets/images/csv.png';
import xlsxLogo from './assets/images/xlsx.png';
import wrongFormatLogo from './assets/images/xlsx.png';
import './assets/css/Dropzone.css';



const ImportFileComponent = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const [response, setResponse] = useState([]);
  const [executionId, setExecutionId] = useState('');
  const [status, setStatus] = useState('');
  const [filename, setFileName] = useState('');
  const [filesize, setFileSize] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const buttonClass = fileUploaded ? 'btn btn-success' : 'btn btn-secondary';
  const [showResetButton, setShowResetButton] = useState(false);


  interface Error {
    lineNumber: number;
    column: number | null;
    errorCode: number;
    gravity: string;
    shortDescription: string;
    longDescription: string;
  }
  const [errors, setErrors] = useState<Error[]>([]);





  // Funzione per calcolare i kilobyte (KB) da byte
  const calculateKB = (bytes: number) => {
    return (bytes / 1024).toFixed(2); // Imposta il numero di decimali desiderato
  };

  // Funzione per calcolare i megabyte (MB) da byte
  const calculateMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2); // Imposta il numero di decimali desiderato
  };


  const resetFileUpload = () => {
    setFileUploaded(false);
    setFormData(new FormData());
    setResponse([]);
    setExecutionId('');
    setStatus('');
    setFileName('');
    setFileSize(0);
    setStartDate('');
    setEndDate('');
    setAcceptedFiles([]);
    setShowResetButton(false);
  };

  const getDropzoneImage = () => {
    if (filename.endsWith('.csv')) {
      return csvLogo;
    } else if (filename.endsWith('.xlsx')) {
      return xlsxLogo;
    } else {
      return wrongFormatLogo;
    }
  };


  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFormData = new FormData();

    let selectedFile: File | null = null; // Definizione della variabile selectedFile


    console.log(e.target.files && e.target.files[0]);

    if (e.target.files && e.target.files[0]) {

      newFormData.append('importedFile', e.target.files[0]);
      selectedFile = e.target.files[0];
      setFormData(newFormData);
      setFileName(selectedFile.name);
      setFileSize(selectedFile.size);
      setFileUploaded(true);
      setShowResetButton(true);
    } else {
      setFileUploaded(false);
      setShowResetButton(false);
      console.log('nessun file selezionato');
    }
  };

  const submitFileData = async () => {

    console.log("Sto inviando il file");
    setFileUploaded(false);
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
        setErrors(response.data.errors);
        //response.data.errors;
        setShowResetButton(false);

        // Ora puoi utilizzare queste variabili come necessario
        console.log("L'id dell'esecuzione è: " + executionId, "Lo stato è:" + status, "Nome del file:" + filename, filesize, startDate, endDate);
        setResponse(response.data);

      })
      .catch(error => console.log(error))

  };

  const onDrop = (acceptedFiles: File[]) => {


    const allowedExtensions = ['.csv', '.xlsx'];

    const isFileAccepted = acceptedFiles.every(file => {
      const fileName = file.name.toLowerCase();
      return allowedExtensions.some(extension => fileName.endsWith(extension));
    });


    if (isFileAccepted) {
      // Simula manualmente l'evento onChange per eseguire onFileChange  ----------DA APPROFONDIRE--------------
      const event = {
        target: {
          files: [acceptedFiles[0]]
        }
      };
      onFileChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
      setAcceptedFiles(acceptedFiles);
      setFileUploaded(true);

    } else {
      setFileUploaded(false);
      console.log('Sono accettati solo file .csv o .xlsx.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (

    <div className='center-flex-div' style={{ minHeight: '100vh', overflowY: 'auto' }}>


      {/* HEADER*/}
      <div style={{ marginTop: 50 }}>
        <p>Importa dipendenti da file '.csv' o '.xlsx'</p>
      </div>


      {/*SEZIONE DRAG AND DROP IMPORT FILE*/}
      <div>
        <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
          <div {...getRootProps()} className='dropzone'>
            <img src={fileUploaded ? getDropzoneImage() : backgroundUploadImage} className='dropzone-image' />
            {fileUploaded ? (
              <p className='dropzone-description'>{filename}</p>
            ) : (
              <>
                <p className='dropzone-description'>Trascina e rilascia il tuo file qui oppure <a href='#'>sfoglia</a></p>
              </>
            )}

            <input {...getInputProps()} />
          </div>
          {/*BUTTON UPLOAD FILE*/}

          <div>
            <button className={`${buttonClass} upload-button`} onClick={(e) => { e.preventDefault(); submitFileData(); }} disabled={!fileUploaded}>Carica</button>
          </div>

          {/*BUTTON CANCEL FILE*/}
          {showResetButton && (
            <div>
              <button className="btn btn-danger cancel-button" onClick={resetFileUpload}>Reset</button>
            </div>
          )}
        </form>
      </div>


      {/*SEZIONE DETTAGLI RISULTATO IMPORT*/}
      <div className='import-result'>
        <p>File: {filename}</p>
        <p>Size: {calculateKB(filesize)} KB</p>
        <p>Status: {status}</p>

        {/* Mappa gli errori se ce ne sono */}
        {errors && errors.length > 0 && (
          <div>
            <h3>Errori:</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>
                  <p>Linea: {error.lineNumber}</p>
                  <p>Errore: {error.shortDescription}</p>
                  <p>Descrizione: {error.longDescription}</p>
                </li>
              ))}
            </ul>
          </div>
        )}


      </div>



    </div>
  );
};


export default ImportFileComponent;