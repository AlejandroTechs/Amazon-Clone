// this file instantiates an express server, middleware, and a base route to call the router

import express from 'express'; 
import UsersRoutes from './api/users.route.js'; 
import cors from 'cors'; 

var port = process.env.PORT || 5000;
const uri = process.env.USERS_URI; 
console.log(uri)
const app = express();

app.use(express.json());
 
app.use(cors({ origin: true}));
 

app.use("/api/user", UsersRoutes)

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
})
 

export default app
