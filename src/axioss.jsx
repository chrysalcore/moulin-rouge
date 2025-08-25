import axios from 'axios';

const axios_mod = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000,
    timeoutErrorMessage: 'Error Timeout',
});

export default axios_mod;