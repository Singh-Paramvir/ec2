'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

interface MessageAttributes {
  senderId: string;
  message: string;
  receiverId: string;
  messageType: string;
  schoolId: number;
  chatRoomId: string;
}

module.exports = (sequelize: Sequelize) => {
  class Message extends Model<MessageAttributes> implements MessageAttributes {
    senderId!: string;
    message!: string;
    receiverId!: string;
    messageType!: string;
    schoolId!: number;
    chatRoomId!: string;

    static associate(models: any) {
      // define association here
    }
  }

  Message.init(
    {
      senderId: { type: DataTypes.STRING },
      message: { type: DataTypes.STRING },
      receiverId: { type: DataTypes.STRING },
      messageType: { type: DataTypes.STRING },
      schoolId: { type: DataTypes.INTEGER },
      chatRoomId: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Messages',
    }
  );

  return Message;
};
