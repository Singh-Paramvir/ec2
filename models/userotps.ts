'use strict';
import {
  Model
}  from 'sequelize';
interface UserOtpAttributes{


 userId:number;
 otpType:number;
 otpValue:number;
 active:Boolean;
 
}
module.exports = (sequelize:any, DataTypes:any) => {
  class  UserOtp extends Model<UserOtpAttributes>
  implements UserOtpAttributes {

    userId!:number;
    otpType!:number;
    otpValue!:number;
    active!:Boolean;
    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserOtp.init({
   
   
    userId: {type:DataTypes.INTEGER},
    otpType: {type:DataTypes.INTEGER},
    otpValue: {type:DataTypes.INTEGER},
    active:{type:DataTypes.BOOLEAN}
 
  }, {
    sequelize,
    modelName: 'UserOtps',
  });
  return  UserOtp;
};
