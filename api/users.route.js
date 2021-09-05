import express from 'express'; 
import UserCtrl from "./users.controller.js";
import OrderCtlr from './order.controller.js';

const router = express.Router()
 
router
.route("/")
.get(UserCtrl.apiFetchUser)
.post(UserCtrl.apiCreateUser)
// .put(UserCtrl.apiUpdateUser)
// .delete(UserCtrl.apiDeleteUser)

router
.route("/order")
.get(OrderCtlr.apiCreateOrder)
// .post(UserCtrl.apiCreateUser)
// .put(UserCtrl.apiUpdateUser)
// .delete(UserCtrl.apiDeleteUser)

export default router

 

 