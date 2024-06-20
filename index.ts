import express, { Request, Response, NextFunction } from 'express';
const cors = require('cors');
import auth from './middleware/auth';
import userRoute from './routes/user.routes';
import memberRoute from './routes/member.routes';
import Avatar from './routes/avatar'
const cron = require('node-cron');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 7777;
import db from './models';
app.options('*', cors());

app.use(express.json());
app.use(express.static('resources'));
app.use("/avatars", express.static(__dirname + "/avatars"));

// Handle OPTIONS requests
// app.options('*', function(req: Request, res: Response) {
//   console.log("****", req.method);
//   if (req.method === 'OPTIONS') {
//     console.log("yes yes");
//     // Respond with the appropriate headers for the preflight request
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.status(200).send();
//   } else {
//     // This should never be reached for OPTIONS requests,
//     // but we include it to avoid sending multiple responses.
//     res.sendStatus(405); // Method Not Allowed
//   }
// });


// console.log(req.method);

app.use((req: Request, res: Response, next: NextFunction) => {
  
  if (req.method === 'OPTIONS') {
    // Respond with the appropriate headers for the preflight request
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
  } else {
    next(); // Pass control to the next middleware
  }
});



app.use('/api/v1/auth', userRoute);
app.use('/api/v1/member', auth, memberRoute);
app.use('/api/v1/avatar',Avatar)

app.get("/api/v1/welcome", auth, (req: Request, res: Response) => {
    res.status(200).send("data get successfully ");
});

app.use((err: any, req: Request, res: Response, next: any) => {
    console.log("/././");
    const status = err.status || 500;
    res.status(status).json({ error: { message: err } });
});

db.sequelize.sync().then(() => {
    server.listen(port, async () => {
        console.log('App Started');
        // cron.schedule('*/3 * * * *', async () => {
        //     console.log('running a task every 10 min');
        //     await codeController.transferIdDepositAssets();
        // });
    });
});
