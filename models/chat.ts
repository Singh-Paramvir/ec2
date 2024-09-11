'use strict';
import { Model } from 'sequelize';

interface ChatAttributes {
  senderid: string;
  message: string;
  receiverid: string;
  messagetype: string;
  schoolid: number;
  chatroomid: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Chat extends Model<ChatAttributes> implements ChatAttributes {
    senderid!: string;
    message!: string;
    receiverid!: string;
    messagetype!: string;
    schoolid!: number;
    chatroomid!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Chat.init({
    senderid: { type: DataTypes.STRING },
    message: { type: DataTypes.STRING },
    receiverid: { type: DataTypes.STRING },
    messagetype: { type: DataTypes.STRING },
    schoolid: { type: DataTypes.INTEGER },
    chatroomid: { type: DataTypes.STRING },
  }, {
    sequelize,
    modelName: 'Chats',
  });

  return Chat;
};
