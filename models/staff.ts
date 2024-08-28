'use strict';
import { Model, DataTypes } from 'sequelize';

interface StaffAttributes {
  username: string;
  schoolid: number;
  name: string;
  contact: string;
  email: string;
  designation: string;
  classid: number;
  principalid: number;
  profile: string;
  gender: string;
  password: string;
  uuid: string;
}

module.exports = (sequelize: any) => {
  class Staff extends Model<StaffAttributes> implements StaffAttributes {
    username!: string;
    schoolid!: number;
    name!: string;
    contact!: string;
    email!: string;
    designation!: string;
    classid!: number;
    principalid!: number;
    profile!: string;
    gender!: string;
    password!: string;
    uuid!: string;

    static associate(models: any) {
      // define association here
    }
  }

  Staff.init(
    {
      username: { type: DataTypes.STRING },
      schoolid: { type: DataTypes.INTEGER },
      name: { type: DataTypes.STRING },
      contact: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      designation: { type: DataTypes.STRING },
      classid: { type: DataTypes.INTEGER },
      principalid: { type: DataTypes.INTEGER },
      profile: { type: DataTypes.STRING },
      gender: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      uuid: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'Staff',
    }
  );

  return Staff;
};
