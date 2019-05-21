import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { Authorization: 'IgorVCosta_puxadinho' }
});

export default HTTP;
