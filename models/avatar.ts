'use strict';
import {
  Model
}  from 'sequelize';
interface avatarAttributes{
avatar:string;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  avatar extends Model<avatarAttributes>
  implements avatarAttributes {

    avatar!:string;
   
  };
  avatar.init({
   avatar: { type: DataTypes.STRING}
 
  }, {
    sequelize,
    modelName: 'avatars',
  });
  return  avatar;
};
