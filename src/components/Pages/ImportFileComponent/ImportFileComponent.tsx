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
  const [errors, setErrors] = useState<Error[]>([]);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const buttonClass = fileUploaded ? 'btn btn-success' : 'btn btn-secondary';
  const [gravityColor, setGravityColor] = useState('');

  const [showResetButton, setShowResetButton] = useState(false);
  const [showFormatError, setShowFormatError] = useState(false);
  const [showImportResult, setShowImportResult] = useState(false);
  const [successImportMessage, setSuccessImportMessage] = useState(false);
  const [warningImportMessage, setWarningImportMessage] = useState(false);
  const [errorImportMessage, setErrorImportMessage] = useState(false);


  interface Error {
    lineNumber: number;
    column: number | null;
    errorCode: number;
    gravity: string;
    shortDescription: string;
    longDescription: string;
  }






  // Funzione per calcolare i kilobyte (KB) da byte
  const calculateKB = (bytes: number) => {
    return (bytes / 1024).toFixed(2); // Imposta il numero di decimali desiderato
  };

  // Funzione per calcolare i megabyte (MB) da byte
  const calculateMB = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2); // Imposta il numero di decimali desiderato
  };

  //resetta tutti i campi se si vuole annullare l'import del file
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
    setErrors([]);
    setShowFormatError(false);
    setShowImportResult(false);
    setSuccessImportMessage(false);
    setWarningImportMessage(false);
    setErrorImportMessage(false);
  };
  //sceglie immagine rispettivamente al tipo di file selezionato
  const getDropzoneImage = () => {
    if (filename.endsWith('.csv')) {
      return csvLogo;
    } else if (filename.endsWith('.xlsx')) {
      return xlsxLogo;
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
      setErrorImportMessage(false);
      setWarningImportMessage(false);
      setSuccessImportMessage(false);
      setShowFormatError(false);
    } else {
      setFileUploaded(false);
      setShowResetButton(false);
      setShowImportResult(false);
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
        setShowResetButton(false);
        if (response.data.status === 'LOADED') {
          setSuccessImportMessage(true);
        } else if (response.data.status === 'LOADED_WITH_ERRORS') {
          setWarningImportMessage(true);
        } else if (response.data.status === 'NOT_LOADED') {
          setErrorImportMessage(true);
        }

        //se la risposta viene ricevuta dal server, mostro i dettagli dell'import
        setShowImportResult(true);

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
      setShowFormatError(false);
      setShowImportResult(false);

    } else {
      setFileUploaded(false);
      setShowResetButton(false);
      setShowFormatError(true);
      setSuccessImportMessage(false);
      setWarningImportMessage(false);
      setErrorImportMessage(false);
      console.log('Sono accettati solo file .csv o .xlsx.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });



  return (

    <div className='center-flex-div' style={{ minHeight: '100vh', overflowY: 'auto' }}>


      {/* HEADER*/}
      <div style={{ marginTop: '5%' }}>
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
              <button className="btn btn-danger cancel-button" onClick={resetFileUpload}>Annulla</button>
            </div>
          )}

        </form>
      </div>

      {/*MESSAGGIO DI ERRORE FORMATO SBAGLIATO*/}
      {showFormatError === true && (
        <div style={{ marginTop: '3%', width: '30%', textAlign: 'center' }} className="alert alert-danger alert-dismissible d-flex align-items-center fade show">
          <i className="bi-exclamation-octagon-fill"></i>
          <p><strong className="mx-2">Errore!</strong> Il formato del file selezionato risulta errato. Sono accettati solo file '.csv' o '.xlsx'  </p>
        </div>
      )}

      {/*MESSAGGIO DI SUCCESSO IMPORT*/}
      {successImportMessage === true && (
        <div style={{ marginTop: '3%', width: '30%', textAlign: 'center' }} className="alert alert-success alert-dismissible d-flex align-items-center fade show">
          <i className="bi-check-circle-fill"></i>
          <p> <strong className="mx-2">Operazione Completata!</strong> Tutti i dipendenti sono stati aggiunti con successo.</p>
        </div>
      )}

      {/*MESSAGGIO DI SUCCESSO CON ERRRORI IMPORT*/}
      {warningImportMessage === true && (
        <div style={{ marginTop: '3%', width: '30%', textAlign: 'center' }} className="alert alert-warning alert-dismissible d-flex align-items-center fade show">
          <i className="bi-exclamation-triangle-fill"></i>
          <p> <strong className="mx-2">Operazione Completata!</strong>Sono stati riscontrati degli errori durante il processo. </p>
        </div>
      )}
      {/*MESSAGGIO DI FALLIMENTO PROCESSO IMPORT*/}
      {errorImportMessage === true && (
        <div style={{ marginTop: '3%', width: '30%', textAlign: 'center' }} className="alert alert-danger alert-dismissible d-flex align-items-center fade show">
          <i className="bi-exclamation-octagon-fill"></i>
          <p><strong className="mx-2">Processo Fallito!</strong> Sono stati riscontrati degli errori bloccanti. </p>
        </div>
      )}










      {/*SEZIONE DETTAGLI RISULTATO IMPORT*/}
      {showImportResult === true && (
        <div className='import-result'>

          <h1>Dettagli Processo</h1> <br />
          
          <div className='detail-import'>
            <p><strong>File:</strong> {filename}</p>
            <p><strong>Dimensione: </strong>{calculateKB(filesize)} KB</p>
            <p><strong>Stato: </strong>{status}</p>
            <p><strong>Data Di Inizio: </strong>{startDate}</p>
            <p><strong>Data Di Fine: </strong>{endDate}</p>
          </div>


          {/* Mappa gli errori se ce ne sono */}
          {errors && errors.length > 0 && (
            <div className="table-container">
           <h2>Errori Riscontrati durante il processo</h2>


            <table className="table table-dark">              
              <thead>
                <tr>
                  <th scope="col">Riga n.</th>
                  <th scope="col">Codice Errore</th>
                  <th scope="col">Gravità</th>
                  <th scope="col">Colonna</th>
                  <th scope="col">Descrizione</th>
                </tr>
              </thead>
              <tbody>


                {errors.map((error, index) => (
                  <tr>
                    <th scope="row" key={index}> {error.lineNumber}</th>
                    <td>{error.errorCode}</td>

                    {error.gravity === 'BLOCKING' ? (
                      <td style={{ color: 'red' }}>{error.gravity}</td>
                    ) : error.gravity === 'WARNING' ? (
                      <td style={{ color: 'yellow' }}>{error.gravity}</td>
                    ) : (
                      <td>{error.gravity}</td>
                    )}

                    <td>{error.column}</td>
                    <td title={error.longDescription}>{error.shortDescription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>

      )}







    </div>
  );
};


export default ImportFileComponent;