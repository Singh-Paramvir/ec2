// const Chat = require("../../../model/message.model");
// const { config } = require("../../../config/config1");
// const { accountType } = config;
// const {
//   schemaFind,
//   createSuccessResponse,
//   uuidv4_34,
//   createErrorResponse,
// } = require("../../../helper/utlis");
// const User = require("../../../model/user.model");
// const ChatRoom = require("../../../model/chatRoom.model");
// const { emits } = require("../../../helper/socketEmits");
// const { Op } = require("sequelize");
// const { sendEmailFunction } = require("../../../helper/email");
// const fs = require('fs')
// const { sendNotification } = require("../../../helper/notification");

const { default: commonController } = require("./common.controller");
import db from "../../models";
const MyQuery = db.sequelize;
const { QueryTypes } = require('sequelize');
const { Op } = require("sequelize");
const fs = require('fs')

class chatController {

  async newMessage(io, socket, data)  {
    console.log(":::: message ::: ", socket.user,data);
    const { receiverid, message, type, schoolid, chatroomid, subject } = data;
    console.log(data,"data from chat ");
    
    if (receiverid && message && type && schoolid) {
      console.log("111");
      
      const receiverDetail = await db.Users.findOne({ where: { uuid: receiverid } });
      console.log("222",receiverDetail);
      if (receiverDetail?.dataValues) {
        console.log("333");
        let allUser = null;
        const user = socket.user;
        let data = null;
        if (chatroomid) {
          console.log("555");
          const userCheck = await db.ChatRooms.findOne({ where: { uuid: chatroomid } });
          console.log("666",userCheck);
          let removeDuplicate = userCheck.users?.includes(receiverid)
            ? userCheck.users
            : userCheck.user + "," + receiverid;
          removeDuplicate = userCheck.users?.includes(user.uuid)
            ? removeDuplicate
            : removeDuplicate + "," + user.uuid;
          allUser = removeDuplicate;
          console.log("121212",message,type,removeDuplicate,user.uuid,chatroomid,"?>?>?>");
          [data] = await Promise.all([
           await db.Chats.create({
              receiverid,
              message,
              messagetype: type,
              senderid: user.uuid,
              chatroomid,
              schoolid,
            }),
            
          await db.ChatRooms.update(
              {
                lastmessage: message,
                messagetype: type,
                users: removeDuplicate,
                senderid: user.uuid,
                receiverid,
              },
              { where: { uuid: chatroomid } }
            ),
            
          ]);
          console.log("13131313");
        } else {
          console.log("141414");
          const uuid = uuidv4_34();
          allUser = `${receiverid},${user.uuid}`;
          [data] = await Promise.all([
            await db.Chats.create({
              receiverid,
              senderid: user.uuid,
              message,
              schoolid,
              messagetype: type,
              chatroomid: uuid,
            }),
            await db.ChatRoom.create({
              uuid,
              subject,
              lastmessage: message,
              messagetype: type,
              users: `${receiverid},${user.uuid}`,
              senderid: user.uuid,
              receiverid,
              schoolid,
            }),
          ]);
        }
        console.log("777");
        const usersData = await db.Users.findAll({
          where: {
            uuid: {
              [Op.in]: allUser.split(","),
            },
          },
        });
        console.log("888",usersData);
        const otherUsersEmails = usersData.map(x => {
          if (x.uuid != user.uuid) return x.email
        }).filter(Boolean)
        console.log("999",otherUsersEmails);
        fs.readFile('view/messageNotify.html', 'utf-8', async (err, data) => {
          if (err) {
            console.log(err)
          }
          let result = data.replace(/SENDER/g, user.username)
          result = result.replace(/MESSAGE/g, type == 'text' ? message : 'Sent a video. Please check your chat box.')
          sendEmailFunction(otherUsersEmails.join(','), 'New Message', result)
        })
        console.log("100");
        await sendNotification(receiverid, subject ?? 'New message comming', message)
        return io
          .to(usersData.map((x) => x.socketid))
          .emit(
            emits.newMessageSuccess,
            createSuccessResponse("Message success", data.dataValues)
          );
      } else
      console.log("444");
        return io
          .to(socket.id)
          .emit(emits.error, createErrorResponse("User not found"));
    } else
      return io
        .to(socket.id)
        .emit(emits.error, createErrorResponse("Provide valid data"));
  };


  async newMessage1  (io, socket, data){
    console.log(":::: message ::: ", socket.id,data);
    const { receiverid, message, type, schoolid, chatroomid, subject } = data;
    console.log(data,"data from chat ");
    
    if (receiverid && message && type && schoolid) {
      console.log("111");
      
      const receiverDetail = await db.Users.findOne({ where: { id: receiverid } });
      console.log("222",receiverDetail);
      if (receiverDetail) {
        console.log("333");
        let allUser = null;
        const user = socket.id;
        let data = null;
        if (chatroomid) {
          console.log("555");
          const userCheck = await db.ChatRooms.findOne({ where: { uuid: chatroomid } });
          console.log("666",userCheck);
          let removeDuplicate = userCheck.users?.includes(receiverid)
            ? userCheck.users
            : userCheck.user + "," + receiverid;
          removeDuplicate = userCheck.users?.includes(user.uuid)
            ? removeDuplicate
            : removeDuplicate + "," + user.uuid;
          allUser = removeDuplicate;
          console.log("121212",message,type,removeDuplicate,user.uuid,chatroomid,"?>?>?>");
          [data] = await Promise.all([
            Chat.create({
              receiverid,
              message,
              messagetype: type,
              senderid: user.uuid,
              chatroomid,
              schoolid,
            }),
            
            ChatRoom.update(
              {
                lastmessage: message,
                messagetype: type,
                users: removeDuplicate,
                senderid: user.uuid,
                receiverid,
              },
              { where: { uuid: chatroomid } }
            ),
            
          ]);
          console.log("13131313");
        } else {
          console.log("141414");
          const uuid = uuidv4_34();
          allUser = `${receiverid},${user.uuid}`;
          [data] = await Promise.all([
            Chat.create({
              receiverid,
              senderid: user.uuid,
              message,
              schoolid,
              messagetype: type,
              chatroomid: uuid,
            }),
            ChatRoom.create({
              uuid,
              subject,
              lastmessage: message,
              messagetype: type,
              users: `${receiverid},${user.uuid}`,
              senderid: user.uuid,
              receiverid,
              schoolid,
            }),
          ]);
        }
        console.log("777");
        const usersData = await User.findAll({
          where: {
            uuid: {
              [Op.in]: allUser.split(","),
            },
          },
        });
        console.log("888",usersData);
        const otherUsersEmails = usersData.map(x => {
          if (x.uuid != user.uuid) return x.email
        }).filter(Boolean)
        console.log("999",otherUsersEmails);
        fs.readFile('view/messageNotify.html', 'utf-8', async (err, data) => {
          if (err) {
            console.log(err)
          }
          let result = data.replace(/SENDER/g, user.username)
          result = result.replace(/MESSAGE/g, type == 'text' ? message : 'Sent a video. Please check your chat box.')
          sendEmailFunction(otherUsersEmails.join(','), 'New Message', result)
        })
        console.log("100");
        await sendNotification(receiverid, subject ?? 'New message comming', message)
        return io
          .to(usersData.map((x) => x.socketid))
          .emit(
            emits.newMessageSuccess,
            createSuccessResponse("Message success", data.dataValues)
          );
      } else
      console.log("444");
        return io
          .to(socket.id)
          .emit(emits.error, createErrorResponse("User not found"));
    } else
      return io
        .to(socket.id)
        .emit(emits.error, createErrorResponse("Provide valid data"));
  };
  
}
export default new chatController;

module.exports.newMessage = async (io, socket, data) => {
  console.log(":::: message ::: ", socket.id,data);
  const {senderid, receiverid, message,schoolid  } = data;  
  console.log(senderid, receiverid, message,schoolid,"data from chat ");
  
  if (receiverid && message  && schoolid) {
    console.log("111");
    var sql = ` select * from Users where id =${receiverid}`
    var result1 = await MyQuery.query(sql, { type: QueryTypes.SELECT });
    console.log(result1[0],"result1");
    
    if (result1[0]) {
      console.log("333");
      let allUser = null;
      const user = socket.user;
      let data = null;
      if (chatroomid) {
        console.log("555");
        const userCheck = await db.ChatRooms.findOne({ where: { uuid: chatroomid } });
        console.log("666",userCheck);
        let removeDuplicate = userCheck.users?.includes(receiverid)
          ? userCheck.users
          : userCheck.user + "," + receiverid;
        removeDuplicate = userCheck.users?.includes(user.uuid)
          ? removeDuplicate
          : removeDuplicate + "," + user.uuid;
        allUser = removeDuplicate;
        console.log("121212",message,type,removeDuplicate,user.uuid,chatroomid,"?>?>?>");
        [data] = await Promise.all([
          Chat.create({
            receiverid,
            message,
            messagetype: type,
            senderid: user.uuid,
            chatroomid,
            schoolid,
          }),
          
          ChatRoom.update(
            {
              lastmessage: message,
              messagetype: type,
              users: removeDuplicate,
              senderid: user.uuid,
              receiverid,
            },
            { where: { uuid: chatroomid } }
          ),
          
        ]);
        console.log("13131313");
      } else {
        console.log("141414");
        const uuid = uuidv4_34();
        allUser = `${receiverid},${user.uuid}`;
        [data] = await Promise.all([
          Chat.create({
            receiverid,
            senderid: user.uuid,
            message,
            schoolid,
            messagetype: type,
            chatroomid: uuid,
          }),
          ChatRoom.create({
            uuid,
            subject,
            lastmessage: message,
            messagetype: type,
            users: `${receiverid},${user.uuid}`,
            senderid: user.uuid,
            receiverid,
            schoolid,
          }),
        ]);
      }
      console.log("777");
      const usersData = await User.findAll({
        where: {
          uuid: {
            [Op.in]: allUser.split(","),
          },
        },
      });
      console.log("888",usersData);
      const otherUsersEmails = usersData.map(x => {
        if (x.uuid != user.uuid) return x.email
      }).filter(Boolean)
      console.log("999",otherUsersEmails);
      fs.readFile('view/messageNotify.html', 'utf-8', async (err, data) => {
        if (err) {
          console.log(err)
        }
        let result = data.replace(/SENDER/g, user.username)
        result = result.replace(/MESSAGE/g, type == 'text' ? message : 'Sent a video. Please check your chat box.')
      commonController.sendEmailFunction(otherUsersEmails.join(','), 'New Message', result)
      })
      console.log("100");
      await sendNotification(receiverid, subject ?? 'New message comming', message)
      return io
        .to(usersData.map((x) => x.socketid))
        .emit(
          "newMessagecome",
          createSuccessResponse("Message success", data.dataValues)
        );
    } else
    console.log("444");
      // return io
      //   .to(socket.id)
      //   .emit(emits.error, createErrorResponse("User not found"));
  } else
  console.log("555");
    // return io
    //   .to(socket.id)
    //   .emit(emits.error, createErrorResponse("Provide valid data"));
};

module.exports.disconnect = async (io, socket) => {
  console.log(":::: disconnect :::: ");

  
};

module.exports.broadcastMessage = async (io, socket, data) => {
  const { message, type, schoolid, senderid, receiverIds, chatroomids, subject } = data;
  // console.log(":::: broadcastMessage :::: ", data);
  let socketIds = []
  for (const receiveridKey in receiverIds) {

    const receiverid = receiverIds[receiveridKey]

    if (receiverid && message && type && schoolid) {
      const receiverDetail = await User.findOne({ where: { uuid: receiverid } });
      if (receiverDetail?.dataValues) {
        let allUser = null;
        const user = socket.user;
        let data = null;
        if (chatroomids[receiveridKey]) {
          const userCheck = await ChatRoom.findOne({ where: { uuid: chatroomids[receiveridKey] } });
          let removeDuplicate = userCheck.users?.includes(receiverid)
            ? userCheck.users
            : userCheck.user + "," + receiverid;
          removeDuplicate = userCheck.users?.includes(user.uuid)
            ? removeDuplicate
            : removeDuplicate + "," + user.uuid;
          allUser = removeDuplicate;
          [data] = await Promise.all([
            Chat.create({
              receiverid,
              message,
              messagetype: type,
              senderid: user.uuid,
              chatroomid: chatroomids[receiveridKey],
              schoolid,
            }),
            ChatRoom.update(
              {
                lastmessage: message,
                messagetype: type,
                users: removeDuplicate,
                senderid: user.uuid,
                receiverid,
              },
              { where: { uuid: chatroomids[receiveridKey] } }
            ),
          ]);
        } else {
          const uuid = uuidv4_34();
          allUser = `${receiverid},${user.uuid}`;
          [data] = await Promise.all([
            Chat.create({
              receiverid,
              senderid: user.uuid,
              message,
              schoolid,
              messagetype: type,
              chatroomid: uuid,
            }),
            ChatRoom.create({
              uuid,
              subject,
              lastmessage: message,
              messagetype: type,
              users: `${receiverid},${user.uuid}`,
              senderid: user.uuid,
              receiverid,
              schoolid,
            }),
          ]);
        }
        const usersData = await User.findAll({
          where: {
            uuid: {
              [Op.in]: allUser.split(","),
            },
          },

        });
        const otherUsersEmails = usersData.map(x => {
          if (x.uuid != user.uuid) return x.email
        }).filter(Boolean)

        fs.readFile('view/messageNotify.html', 'utf-8', async (err, data) => {
          if (err) {
            console.log(err)
          }
          let result = data.replace(/SENDER/g, user.username)
          result = result.replace(/MESSAGE/g, type == 'text' ? message : 'Sent a video. Please check your chat box.')
          await sendEmailFunction(otherUsersEmails.join(','), 'New Message', result)
        })
        socketIds.push(...usersData.map((x) => x.socketid))

      } else
        return io
          .to(socket.id)
          .emit(emits.error, createErrorResponse("User not found"));
    }
  }
  return io
    .to(socketIds)
    .emit(
      emits.broadcastMessageSuccess,
      createSuccessResponse("Message success", data)
    );
}
