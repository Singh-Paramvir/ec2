'use strict';
import { Model, DataTypes } from 'sequelize';

interface ParentAttributes {
  username: string;
  schoolid: number;
  name: string;
  password: string;
  contact: string;
  email: string;
  gender: string;
  relation: string;
  uuid: string;
  otherEmails: string[];
  otherContacts: string[];
}

module.exports = (sequelize: any) => {
  class Parent extends Model<ParentAttributes> implements ParentAttributes {
    username!: string;
    schoolid!: number;
    name!: string;
    password!: string;
    contact!: string;
    email!: string;
    gender!: string;
    relation!: string;
    uuid!: string;
    otherEmails!: string[];
    otherContacts!: string[];

    static associate(models: any) {
      // Define associations here, e.g.,
      // this.belongsTo(models.School, { foreignKey: 'schoolid' });
    }
  }

  Parent.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      schoolid: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      relation: {
        type: DataTypes.STRING,
      },
      uuid: {
        type: DataTypes.STRING,
      },
      otherEmails: {
        type: DataTypes.STRING,
      },
      otherContacts: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Parent',
    }
  );

  return Parent;
};
