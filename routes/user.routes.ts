import { verify } from 'crypto';
import express from 'express';

 import userController from "../controllers/user.controller";

 const multer = require("multer");
 var storage = multer.diskStorage({
  destination: function (req: any, file:any, cb: any){
    cb(null, "profile");
  },
  filename: function(req:any, file: any, cb: any) {
    cb(null, file.originalname + ".png");
  },
 });
 var upload = multer({
  storage:storage
 })

const router=express.Router();
 router.post("/register",userController.register);
 router.post("/verify",userController.verify);
   router.post("/login",userController.login);
   router.post("/updatePassword",userController.updatePassword);
   router.put("/newPassword",userController.newPassword);
   router.put("/updateProfile",userController.updateProfile);
   router.put("/changePassword",userController.changePassword);
   router.post("/getAll",userController.getAll);
   router.get("/delete",userController.deleteUser);
   router.post("/qrcode",userController.qrCode);
   router.post("/postimage",upload.single("profile"),userController.postImage);
  //  router.post("/getwallet",userController.addWallet);

  //  router.post("/test",userController.test);
 
    

export default router;

