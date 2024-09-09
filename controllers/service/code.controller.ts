import { hash, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
const multer = require('multer');
var nodemailer = require('nodemailer');
const mysql = require('mysql2/promise');

const fs = require("fs");

import bcryptjs = require("bcryptjs");
bcryptjs.genSalt(10, function (err, salt) {
    bcryptjs.hash("B4c0/\/", salt, function (err, hash) {
        // Store hash in your password DB.
    });
});


// var bcryptjs= require('bcryptjs');

import db from "../../models"
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const { SECRET_KEY } = require('../../appconfig')
const jwt = require('jsonwebtoken')
import commonController from '../common/common.controller';
const videoshow = require("videoshow");

import { Encrypt } from '../common/encryptpassword';
const moment = require("moment");

class CodeController {


    async loginUser(payload: any, res: Response) {
        try{
           const{username,password} = payload
           console.log(payload,"asas");
           var sql = ` select * from Users where id =1`


           var result1 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            console.log(result1,"1111");
      
           let check = await db.Users.findOne({
            where:{
                username
            }
           })

           if(!check){
            commonController.errorMessage("user not found",res)
           }else{
            if (await Encrypt.comparePassword(password.toString(), check.password.toString())) {

                const token = jwt.sign({
                    id: check.id,
                    email:check.email,
                    type: check.type,
                }, process.env.TOKEN_SECRET);

                commonController.successMessage(token, "login successfully", res)
            } else {
                commonController.errorMessage("INvalid Password", res)
            }
           }
           
 
        }catch(e){
         console.log(e);
        }
     }



  
}



export default new CodeController();
// export default new hello();
