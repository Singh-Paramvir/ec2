import express, { Request, Response, NextFunction } from 'express';
//  import { newMessage, disconnect, broadcastMessage } from './controllers/common/chat';
import chatController from './controllers/common/chat'
const cors = require('cors');
import auth from './middleware/auth';
import userRoute from './routes/user.routes';
import memberRoute from './routes/member.routes';
import Avatar from './routes/avatar'
import commonController from './controllers/common/common.controller';
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const port = process.env.PORT ;
import db from './models';
app.options('*', cors());



app.use(express.json());
app.use(express.static('resources'));
app.use("/avatars", express.static(__dirname + "/avatars"));


app.use((req: Request, res: Response, next: NextFunction) => {
    next(); 
});



app.use('/api/v1/auth', userRoute);
app.use('/api/v1/member', auth, memberRoute);
app.use('/api/v1/avatar',Avatar)

app.get("/api/v1/welcome", (req: Request, res: Response) => {
    res.status(200).send("data get successfully");
});

app.use((err: any, req: Request, res: Response, next: any) => {
    console.log("/././");
    const status = err.status || 500;
    res.status(status).json({ error: { message: err } });
});

// socket code
const io = new Server(server);
io.use(async (socket, next) => {
    console.log("dfdfdf",socket.id);
    
    const token = socket?.handshake?.headers?.authorization || socket?.handshake?.query.authorization;

    if (token) {
        try {
            console.log(token,"tokennrer");
            // update socket id in user table
            const decode = commonController.verifyJwt(token);
            console.log(decode.id,"decode");
            

            let updateSocketId = await db.Users.findOne({
                where:{
                    id:decode.id
                }
            })
            if(updateSocketId){
                console.log("done");
                
                await updateSocketId.update({
                    socketId:socket.id
                })
            }
            console.log("not find");
            
            next()
          
        } catch (error) {
            return next(new Error("Invalid token"));
        }
    } else {
        return next(new Error("Token missing"));
    }
});
io.on('connection', (socket) => {
  console.log('A user connected',socket.id);

  socket.on('newMessage', (data) => {
    console.log(data,"data");
    
    chatController.newMessage(io, socket, data);
});

  socket.on('disconnect', () => {
    // disconnect(io, socket);
});
});

db.sequelize.sync().then(() => {
    server.listen(port, async () => {
        console.log('App Started');
        // cron.schedule('*/1 * * * *', async () => {
        //     console.log('running a task every 10 min');
        //     await codeController.test();
        // });
    });
});
