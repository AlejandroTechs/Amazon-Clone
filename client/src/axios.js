// import axios npm package

import axios from 'axios';

const instance = axios.create({
    // THE API  URL at backend
    baseURL: 'http://localhost:3000/api/user' 
 
}); 

export default instance 

 