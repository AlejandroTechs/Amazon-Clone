import {} from 'dotenv/config'

import connectMongoDB from './config/databaseConfig.js'
import UserDAO from './DAO/usersDAO.js'
import app from './server.js'
 
  
connectMongoDB()
.then( async atlasClient => {
    await UserDAO.connectDB(atlasClient)
    await app
})
 

// *************** For client build 

// app.use(express.static(path.join(__dirname, 'build')));


// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });