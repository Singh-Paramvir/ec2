'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
firstname:string;
email:string;


}
module.exports = (sequelize:any, DataTypes:any) => {
  class  User extends Model<UserAttributes>
  implements UserAttributes {
    firstname!:string;
    email!:string;

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
    firstname:{type:DataTypes.STRING,},
    email:{type:DataTypes.STRING}
 
  }, {
    sequelize,
    modelName: 'Users',
  });
  return  User;
};
