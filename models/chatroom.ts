'use strict';
import { Model } from 'sequelize';

interface ChatRoomAttributes {
  uuid: string;
  messagetype: string;
  lastmessage: string;
  subject: string;
  users: string;
  senderid: string;
  receiverid: string;
  schoolid: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class ChatRoom extends Model<ChatRoomAttributes> implements ChatRoomAttributes {
    uuid!: string;
    messagetype!: string;
    lastmessage!: string;
    subject!: string;
    users!: string;
    senderid!: string;
    receiverid!: string;
    schoolid!: number;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ChatRoom.init({
    uuid: { type: DataTypes.STRING },
    messagetype: { type: DataTypes.STRING },
    lastmessage: { type: DataTypes.STRING },
    subject: { type: DataTypes.STRING },
    users: { type: DataTypes.STRING },
    senderid: { type: DataTypes.STRING },
    receiverid: { type: DataTypes.STRING },
    schoolid: { type: DataTypes.INTEGER },
  }, {
    sequelize,
    modelName: 'ChatRooms',
  });

  return ChatRoom;
};
