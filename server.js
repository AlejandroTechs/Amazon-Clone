// this file instantiates an express server, middleware, and a base route to call the router

import express from 'express'; 
import UsersRoutes from './api/users.route.js'; 
import cors from 'cors'; 
 
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __buildDir = path.join(__dirname, 'client/build')

var port = process.env.PORT || 5000;
 
 
const app = express();

app.use(express.json());
 
app.use(cors({ origin: true}));
 

app.use("/api/user", UsersRoutes)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
// Set static folder at heroku servers
    app.use(express.static(__buildDir));

    app.get('*', (req, res) =>{ 
        res.sendFile('index.html'); 
        console.log('sendFile should have worked')
    });
} else { 
    app.get('*', (req, res) =>{ 
        res.send("May not be in production")
    });
}

app.listen(port, () => {
    console.log(`Example app listening at ${port}`)
})
 

export default app
