'use strict';
import {
  Model
}  from 'sequelize';
interface UserOtpAttributes{


  senderId:number;
  receiverId:number;
  message: string;
 
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Message extends Model<UserOtpAttributes>
  implements UserOtpAttributes {

    senderId!:number;
  receiverId!:number;
  message!: string;
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Message.init({
   
   
    senderId: {type:DataTypes.INTEGER},
    receiverId: {type:DataTypes.INTEGER},
    message: {type:DataTypes.STRING},
 
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return  Message;
};
