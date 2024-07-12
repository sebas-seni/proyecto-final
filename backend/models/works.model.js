import { Sequelize, DataTypes } from 'sequelize';

import employeeModel from './employees.model';

const sequelize = new Sequelize('mysql::memory');

const worksModel = sequelize.define('Works', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: DataTypes.DATEONLY,
});

// Relacion One2Many con el modelo de empleado
worksModel.belongsTo(employeeModel, {
  foreignKey: 'employeeId',
  as: 'employee',
});

employeeModel.hasMany(worksModel, {
  foreignKey: 'employeeId',
  as: 'works',
});

export default worksModel;
