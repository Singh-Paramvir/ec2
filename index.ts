import express, { Request, Response, NextFunction } from 'express';
import { newMessage, disconnect, broadcastMessage } from './controllers/common/chat';
const cors = require('cors');
import auth from './middleware/auth';
import userRoute from './routes/user.routes';
import memberRoute from './routes/member.routes';
import Avatar from './routes/avatar'
const cron = require('node-cron');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const port = process.env.PORT || 7777;
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
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('newMessage', (data) => {
    newMessage(io, socket, data);
});

  socket.on('disconnect', () => {
    disconnect(io, socket);
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
