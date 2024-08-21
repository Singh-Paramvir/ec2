'use strict';
import {
  Model
}  from 'sequelize';
interface UserAttributes{
name:string;



}
module.exports = (sequelize:any, DataTypes:any) => {
  class  User extends Model<UserAttributes>
  implements UserAttributes {
    name!:string;
 

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
    name:{type:DataTypes.STRING,}
 
  }, {
    sequelize,
    modelName: 'table1',
  });
  return  User;
};
