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

    ///Section User Start

    async  addNewUser(payload: any, res: Response) {
        try {
            console.log("api call");


               var images = [
                '/Users/mac1/Desktop/parm/project/ec2check/public/videosImages/step_1.png',
                '/Users/mac1/Desktop/parm/project/ec2check/public/videosImages/step_2.png',
                '/Users/mac1/Desktop/parm/project/ec2check/public/videosImages/step_3.png'
              ]


            const videoOptions = {
                fps: 60,
                loop: 5, // seconds
                transition: true,
                transitionDuration: 1, // seconds
                videoBitrate: 1024,
                videoCodec: 'libx264',
                // size: '640x?',
                audioBitrate: '128k',
                audioChannels: 2,
                format: 'mp4',
                pixelFormat: 'yuv420p'
              };
              const videoUuid = `video-${moment().format('YYYY-MM-DD-HH-mm-ss')}`
              videoshow(images, videoOptions)
              .audio('./public/audio/audio.m4a')
              .save(`./avatars/videos/${videoUuid}.mp4`)
              .on('start', function (command) {
                console.log('ffmpeg process started:', command)
              })
              .on('error', function (err, stdout, stderr) {
                console.error('Error:', err)
                console.error('ffmpeg stderr:', stderr)
                return res
                      .status(400)
                      .json({success: false, message: "Video creation failed."});
              })
         
                .on('end', async function (output) {
                  console.log('Video created in:', output);
                  fs.readFile('view/videoActivityReport.html', 'utf-8', async (err, data) => {
                    if (err) {
                      console.log(err);
                    }
                    let result = data.replace(/STUDENT/g, "student");
                    result = result.replace(/PARENT/g, "parentEmail");
                    result = result.replace(/DATE/g, moment().format('dddd, MMMM Do YYYY'));
                        result = result.replace(/VIDEO_URL/g, `${process.env.BACKEND_URL}/avatars/videos/${videoUuid}.mp4`);
                    result = result.replace(/VIDEO_NAME/g, `${videoUuid}.mp4`);
        
                  let parentEmail = ["paramvirsingh4705@gmail.com"]

                await  commonController.sendVideoEmailToMultiple({ parentEmail, video: `${process.env.BACKEND_URL}/avatars/videos/${videoUuid}.mp4`, videoName: `${videoUuid}.mp4` }, result);
        
                  })
                  return res.status(200).json({ success: true, message: "Video created successfully." });
                });

          } catch (err) {
            console.error('Error executing query:', err);
          } 
    }
    async verify(payload: any, res: Response) {
        try {

            let email = "testing@yopmail.com"

            fs.readFile('view/password.html', 'utf-8', async (err, data) => {
                if (err) {
                  console.log(err)
                }
                let result = data.replace(/PASSWORD/g, "Password")
                result = result.replace(/USERNAME/g, "testing")
               
                commonController.sendEmailFunction(email, "Login Credential", result)
                commonController.successMessage({},"email send",res)
              })
           
           
            
        } catch (e) {
            commonController.errorMessage;
        }
    }
    // login user

    async loginUser(payload: any, res: Response) {
       try{
           let emails =["testing@yopmail.com","paramvirsingh4705@gmail.com"] ;

        fs.readFile('view/messageNotify.html', 'utf-8', async (err, data) => {
            if (err) {
              console.log(err)
            }
            console.log(emails,"email all");
            
            let result = data.replace(/SENDER/g, "Staff")
            result = result.replace(/MESSAGE/g, `hello this is just for testing`)
         await commonController.sendEmailToMulti(emails, 'Message From Staff', result)
         commonController.successMessage({},"message send to multiple",res)
          })

       }catch(e){
        console.log(e);
       }
    }
    // verify user

    async verifyUser(payload: any, res: Response) {
        try {
            const { id, otp } = payload;

            var checkOtp = await db.UserOtps.findOne({
                where: {
                    userId: id,
                    active: true

                }
            })

            if (checkOtp) {
                if (checkOtp.otpValue == otp) {

                    await checkOtp.update({ active: false });
                    commonController.successMessage({}, "Otp Verified", res)

                } else {
                    commonController.errorMessage("Invalid OTP", res)
                }
            }
        } catch (e) {
            commonController.errorMessage;
        }
    }

  
    // // updatePassword

    async updatePassword(payload: any, res: Response) {
        try {
            const { emailId, otp, password } = payload;
            // console.log(payload)
            var checkOtp = await db.UserOtps.findOne({
                where: {

                    otpValue: otp

                }
            })
            console.log(checkOtp.otpValue, otp);
            if (checkOtp) {
                if (checkOtp.otpValue == otp) {

                    commonController.successMessage({}, "Otp Verified", res)


                }
                else {
                    commonController.errorMessage("Invalid OTP", res)

                }
            }
        } catch (e) {
            commonController.errorMessage;
        }
    }
    // new password

    async newPassword(payload: any, res: Response) {
        const { emailId, password } = payload;
        //Check If Email Exists

        var checkdata = await db.Users.findOne({
            where: {
                emailId,



            }
        })
        console.log(emailId);
        if (checkdata) {
            var hash = await Encrypt.cryptPassword(password.toString());

            var result = await checkdata.update({

                password: hash,

            })
            commonController.successMessage(emailId, "password update  sucessfully", res)




        } else {
            commonController.errorMessage("password not update", res)
            console.log("no");
        }
    }

    // get user by id

    async getByUserId(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
                emailId

            }
        })
        if (checkdata) {
            const token = jwt.sign({
                id: checkdata.id,
                emailId,
                name: checkdata.fullName,
                emailVerfied: checkdata.isEmailVerfied,
                is2FaEnabled: checkdata.is2FaEnabled,
                isPhoneVerfied: checkdata.isPhoneVerfied
            }, process.env.TOKEN_SECRET);
            console.log(token);
            commonController.successMessage(checkdata, "data get  sucessfully", res)

            console.log(checkdata);
        } else {
            commonController.errorMessage("data not get", res)
            console.log("no");
        }
    }

    // update profile
    async updateProfile(payload: any, res: Response) {
        const { emailId, fullName, newemailId } = payload;
        //Check If Email Exists

        var checkdata = await db.Users.findOne({
            where: {
                emailId
            }
        })
        if (checkdata) {
            var result = await checkdata.update({

                fullName,
                emailId: newemailId

            })
            commonController.successMessage(checkdata, "data updated sucessfully", res)
            console.log(checkdata.emailId);
        } else {
            commonController.errorMessage("data not update", res)
            console.log("not found");
        }
    }

    // change Password

    async changePassword(payload: any, res: Response) {
        const { id, password, newPassword } = payload;
        var hash = await Encrypt.cryptPassword(password.toString());
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
                id

            }
        })

        if (checkdata) {
            console.log(checkdata);
            const check = await Encrypt.comparePassword(password.toString(), checkdata.password.toString())
            console.log(check);
            if (await Encrypt.comparePassword(password.toString(), checkdata.password.toString())) {

                var result = await checkdata.update({


                    password: newPassword

                })
                console.log(hash);
                console.log("ok ");
                commonController.successMessage(id, "Password changed successfully", res)

            } else {
                commonController.errorMessage("INvalid Details", res)
            }
        }
        else {
            commonController.errorMessage("Email password not match", res)
            console.log("no");


        }
    }
    // find all users

    async getAll(payload: any, res: Response) {

        try {
           console.log("api start");
           
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'paramvir@airai.games',
                  pass: 'pb12ac4705'
                }
              });
              
              var mailOptions = {
                from: 'paramvir@airai.games',
                to: 'sunnykl1233@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
              console.log("api end");

        } catch (e) {
            console.log(e);

        }
    }


    // async test(payload: any, res: Response) {
    //     const {cc,phone}=payload;
    //     console.log(payload,"pa") 
    //     client.messages.create({
    //         body: 'Hello from Node',
    //         to: '+916284507322',
    //         from: '+12345678901'
    //      }).then(message => console.log(message))
    //        // here you can implement your fallback code
    //        .catch(error => console.log(error))

    // }


    // delete user

    async deleteUser(payload: any, res: Response) {
        const { emailId } = payload;
        //Check If Email Exists
        var checkdata = await db.Users.findOne({
            where: {
                emailId

            }
        })
        if (checkdata) {


            var result = checkdata.destroy({
                where: {
                    emailId: emailId
                }
            }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
                if (rowDeleted === 1) {
                    console.log('Deleted successfully');
                }
            }, function (err) {
                console.log(err);
            });

            commonController.successMessage(checkdata, "data delete  sucessfully", res)
            console.log("data delete  sucessfully");


        } else {
            commonController.errorMessage("data not delete", res)
            console.log("not found");
        }
    }

    async test(){
        try{

            var sql = `SELECT * FROM table1`


            var result1 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
            console.log(result1,"logging done");
            

        }catch(e){
            console.log(e)
        }
    }
  


  
}



export default new CodeController();
// export default new hello();
