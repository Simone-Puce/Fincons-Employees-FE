// ImportEmployeeFileService.ts
import axios from 'axios';

class ImportEmployeeFileService {
  static importFile(formData: FormData) {
    return axios.post('http://localhost:81/be/company-employee-management/v1/employee/importfile', formData);
  }
}

export default ImportEmployeeFileService;