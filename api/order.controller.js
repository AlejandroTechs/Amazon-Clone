import userDAO from '../DAO/usersDAO.js'; 


export default class OrderCtlr {

    static async apiCreateOrder(req, res, next) {
        let reqUser = {}; 
        const { username, password, email } = req.query; 
        const order = {};
        order = req.query.order
        console.log(username, password, email);
        reqUser = { email, password};
        // passing object data to dao file and then recieving the returned data from dao file
        const userResponse = await userDAO.createOrder(reqUser, order)
        // creating a response object to store values of the recieved data from dao file
        return res.json(userResponse)
    };

}

 

 