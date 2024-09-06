 import { newMessage, disconnect, broadcastMessage } from './controllers/common/chat';
// import User from './model/user.model';
// import { verifyJwt } from './helper/utlis';
import db from "./models";

export const socketHandler = (io) => {
    console.log("connect socket");
    
  io.use(async (socket, next) => {
    // const token =
    //   socket?.handshake?.headers?.authorization ||
    //   socket?.handshake?.query.authorization;
    // if (token) {
    //   const decode = verifyJwt(token);
    //   const authDetail = await Users.findOne({ where: { id: decode.id } });
    //   if (authDetail) {
    //     await User.update({ socketid: socket.id }, { where: { id: authDetail.id } });
    //     authDetail['socketid'] = socket.id;
    //     socket['user'] = authDetail.dataValues;
    //     next();
    //   } else return next(new Error('User not found'));
    // } else return next(new Error('Invalid token'));
  });

  io.on('connection', (socket) => {
    console.log('Connected:', socket.user);
    socket.on("newMessage", (data) => newMessage(io, socket, data));
    socket.on("disconnect", () => disconnect(io, socket));
    socket.on("broadcastMessage", (data) => broadcastMessage(io, socket, data));
  });
};
