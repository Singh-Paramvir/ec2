'use strict';
import { Model, DataTypes } from 'sequelize';

interface SchoolAttributes {
  name: string;
  address: string;
  contact: string;
  email: string;
  bgcolor: string;
  forecolor: string;
  logo: string;
  websiteurl: string;
}

module.exports = (sequelize: any) => {
  class School extends Model<SchoolAttributes> implements SchoolAttributes {
    name!: string;
    address!: string;
    contact!: string;
    email!: string;
    bgcolor!: string;
    forecolor!: string;
    logo!: string;
    websiteurl!: string;

    static associate(models: any) {
      // define association here
    }
  }

  School.init(
    {
      name: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      contact: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      bgcolor: { type: DataTypes.STRING },
      forecolor: { type: DataTypes.STRING },
      logo: { type: DataTypes.STRING },
      websiteurl: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'School', 
    }
  );

  return School;
};
