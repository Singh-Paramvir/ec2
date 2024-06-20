import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";
 

const router=express.Router();
  router.post("/verify",userController.verifyCode);
   router.get("/getByUserId",userController.getByUserId);
   
  
export default router;  