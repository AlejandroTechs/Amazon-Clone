import userDAO from '../DAO/usersDAO.js'; 
 

// todo add authentication and authorization, update and delete funcionalities

export default class UserCtrl {
    static async apiFetchUser(req, res, next) {
       
      let reqUser = {}; 
      // return res.status(200).send('Hit the userCTLR'); 
      
      const {email, password} = req.query; 
      reqUser.email = email;
      reqUser.password = password;

      // passing object data to dao file and then recieving the returned data from the dao file

      const userResponse = await userDAO.fetchUser(reqUser)
       
      // creating a response object to store values of the recieved data from dao file

      // console.log(` data recieved at userController is >>> ${JSON.stringify(userResponse)}`);

      res.send( userResponse )
      
    }

    static async apiCreateUser(req, res, next) {
      let reqUser = {}; 
      reqUser.userName = req.query.userName; 
      reqUser.password = req.query.password; 
      reqUser.email = req.query.email;
      console.log(reqUser); 
      // passing object data to dao file and then recieving the returned data from dao file
      const userResponse = await userDAO.createUser(reqUser)
      // creating a response object to store values of the recieved data from dao file
      return res.json(userResponse)
    }


}