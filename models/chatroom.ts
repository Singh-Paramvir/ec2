'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

interface ChatRoomAttributes {
  uuid: string;
  messageType: string;
  lastMessage: string;
  subject: string;
  users: string;
  senderId: string;
  receiverId: string;
  schoolId: number;
}

module.exports = (sequelize: Sequelize) => {
  class ChatRoom extends Model<ChatRoomAttributes> implements ChatRoomAttributes {
    uuid!: string;
    messageType!: string;
    lastMessage!: string;
    subject!: string;
    users!: string;
    senderId!: string;
    receiverId!: string;
    schoolId!: number;

    static associate(models: any) {
      // define association here
    }
  }

  ChatRoom.init(
    {
      uuid: { type: DataTypes.STRING },
      messageType: { type: DataTypes.STRING },
      lastMessage: { type: DataTypes.STRING },
      subject: { type: DataTypes.STRING },
      users: { type: DataTypes.STRING },
      senderId: { type: DataTypes.STRING },
      receiverId: { type: DataTypes.STRING },
      schoolId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'ChatRooms',
    }
  );

  return ChatRoom;
};
