import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
const nodemailer = require("nodemailer");

class CommonController {

    sendEmailFunction = async (email, subject, html) => {
       console.log("send email call",email);
       
    
        // Create a transporter object using the default SMTP transport for Gmail
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajni@airai.games',
                pass: 'bhaw tuhk ihvw snvr',
                // Use environment variables if you prefer
                // user: process.env.EMAIL_USER,
                // pass: process.env.EMAIL_PASSWORD,
            },
        });
    
        const mailDetails = {
            from: 'rajni@airai.games', // Sender address
            to: email,
            subject,
            html,
        };    
        try {
            const info = await mailTransporter.sendMail(mailDetails);
            console.log("Email sent successfully:", info.messageId);
        } catch (err) {
            console.error('Error occurred:', err);
        }
    };

    sendEmailToMulti = async (emails, subject, html) => {

        const mailTransporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: 'rajni@airai.games',
                 pass: 'bhaw tuhk ihvw snvr',
                 // Use environment variables if you prefer
                 // user: process.env.EMAIL_USER,
                 // pass: process.env.EMAIL_PASSW   ORD,
             },
         });
     
         // Ensure emails is an array and join it into a comma-separated string
         const emailList = Array.isArray(emails) ? emails.join(',') : emails;
     
         let mailDetails = {
             from: `rajni@airai.games`,
             to: emailList,
             subject,
             html
         };
     
         try {
             let info = await mailTransporter.sendMail(mailDetails);
             console.log('Email sent successfully', info.response);
         } catch (error) {
             console.error('Error Occurs', error);
         }
     };

     sendVideoEmailToMultiple = async (recipient, html) => {
       console.log(recipient,"testtest");
       
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajni@airai.games',
                pass: 'bhaw tuhk ihvw snvr',
            },
        });
        let mailDetails = {
            from: `rajni@airai.games`,
            to: recipient.parentEmail,
            subject: 'Activity Report',
            html,
            attachments: [
                {
                    filename: 'video.mp4',
                    path: recipient.video
                },
            ],
        };
        try {
            let info = await mailTransporter.sendMail(mailDetails);
            console.log('Email sent successfully', info.response);
        } catch (error) {
            console.error('Error Occurs', error);
        }
    }
   
    generateOtp(){
        return Math.floor(100000 + Math.random() * 900000);
    }
    cryptPassword ( password) {
       bcrypt.genSalt(10, function(err, salt) {
        if (err) 
          return err;
    
        bcrypt.hash(password, salt, function(err, hash) {
          return  hash;
        });
      });
    };
    
    comparePassword = function(plainPass, hashword) {
       bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
           return err == null ?
               isPasswordMatch:
               err;
       });
    };
    successMessage(data: any, msg: string, res: Response) {
        try{
        return res.status(200).send({
            message: msg,
            data
        });}catch(e){
            console.log(e);
        }
    }
    createSuccessResponse = (
        message,
        data = null,
        success = true
      ) => {
        return { success, message, data };
      };

      uuidv4_34 = () => {
        return "xxxxxxxx-xxxx-1xxx-axxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      };


    errorMessage(msg: string, res: Response) {
       try{
        return res.status(400).send({
            error: {
                message: msg
            }
        });}catch(e){
            console.log(e);
        }
    }
    
}
export default new CommonController();