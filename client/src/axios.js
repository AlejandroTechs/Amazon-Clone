// import axios npm package

import axios from 'axios';

const instance = axios.create({
    // THE API  URL at backend
    baseURL: 'http://localhost:3000/api/user' 
    // http://localhost:5001/clone-ca463/us-central1/api
}); 

export default instance 

 