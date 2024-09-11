import { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import moment from 'moment';
import videoshow from 'videoshow';
import fs from 'fs';
class UserController {

    async login(req: Request, res: Response) {
        try {
           
            // var userId=req?.user?.id;
            const{username,password} = req.body
            fs.readFile('view/messageNotify.html', 'utf-8', async (err, data) => {
                if (err) {
                  console.log(err)
                }
                let result = data.replace(/SENDER/g, "user.username")
                result = result.replace(/MESSAGE/g, 'Sent a video. Please check your chat box.')
               commonController. sendEmailFunction("otherUsersEmails.join(',')", 'New Message', result)
              })
            // await codeController.loginUser({
            //     username,password

            // }, res)
        } catch (e) {
            commonController.errorMessage("user not login", res)

        }
    }
      //IMAGE UPLOAD
      async postImage(req, res) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ success: false, message: "No images uploaded." });
            }
    
            const images = req.files.map(file => file.path); // Get the paths of the uploaded images
    
            const videoOptions = {
                fps: 60,
                loop: 5, // seconds
                transition: true,
                transitionDuration: 1, // seconds
                videoBitrate: 1024,
                videoCodec: 'libx264',
                audioBitrate: '128k',
                audioChannels: 2,
                format: 'mp4',
                pixelFormat: 'yuv420p'
            };
    
            const videoUuid = `video-${moment().format('YYYY-MM-DD-HH-mm-ss')}`;
    
            videoshow(images, videoOptions)
                .audio('./public/audio/audio.m4a') // Adjust the audio file path if needed
                .save(`./avatars/videos/${videoUuid}.mp4`)
                .on('start', function (command) {
                    console.log('ffmpeg process started:', command);
                })
                .on('error', function (err, stdout, stderr) {
                    console.error('Error:', err);
                    console.error('ffmpeg stderr:', stderr);
                    return res
                        .status(400)
                        .json({ success: false, message: "Video creation failed." });
                })
                .on('end', async function (output) {
                    console.log('Video created in:', output);
                    fs.readFile('view/videoActivityReport.html', 'utf-8', async (err, data) => {
                        if (err) {
                            console.log(err);
                            return res
                                .status(500)
                                .json({ success: false, message: "Failed to read HTML template." });
                        }
    
                        let result = data.replace(/STUDENT/g, "student")
                                         .replace(/PARENT/g, "parentEmail")
                                         .replace(/DATE/g, moment().format('dddd, MMMM Do YYYY'))
                                         .replace(/VIDEO_URL/g, `${process.env.BACKEND_URL}/avatars/videos/${videoUuid}.mp4`)
                                         .replace(/VIDEO_NAME/g, `${videoUuid}.mp4`);
    
                        let parentEmail = ["paramvirsingh4705@gmail.com"];
    
                        await commonController.sendVideoEmailToMultiple({
                            parentEmail,
                            video: `${process.env.BACKEND_URL}/avatars/videos/${videoUuid}.mp4`,
                            videoName: `${videoUuid}.mp4`
                        }, result);
    
                        return res.status(200).json({ success: true, message: "Video created successfully." });
                    });
                });
    
        } catch (e) {
            commonController.errorMessage("QR code is not found", res);
            console.log(e);
        }
    }
    
   

  

  
      
}


export default new UserController();