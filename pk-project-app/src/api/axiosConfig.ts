import axios from 'axios';

const instanceAxios = axios.create({
    baseURL: process.env.REACT_APP_PK_PROJECT_API,
});

export default instanceAxios;