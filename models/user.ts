'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
  name: string;
  username: string;
  email: string;
  password: string;
  type: string;
  socketid: string;
  uuid: string;
  schoolid: number



}
module.exports = (sequelize:any, DataTypes:any) => {
  class  User extends Model<UserAttributes>
  implements UserAttributes {
    name!: string;
    username!: string;
    email!: string;
    password!: string;
    type!: string;
    socketid!: string;
    uuid!: string;
    schoolid!: number
 

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    socketid: { type: DataTypes.STRING },
    uuid: { type: DataTypes.STRING },
    schoolid: { type: DataTypes.INTEGER },
 
  }, {
    sequelize,
    modelName: 'Users',
  });
  return  User;
};
