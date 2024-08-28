'use strict';
import { Model, DataTypes } from 'sequelize';

interface ClassAttributes {
  name: string;
  schoolid: number;
  description: string;
}

module.exports = (sequelize: any) => {
  class Class extends Model<ClassAttributes> implements ClassAttributes {
    name!: string;
    schoolid!: number;
    description!: string;

    static associate(models: any) {
      // Define associations here, e.g.,
      // this.belongsTo(models.School, { foreignKey: 'schoolid' });
    }
  }

  Class.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      schoolid: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Class',
    }
  );

  return Class;
};
