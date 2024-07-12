import { Sequelize, DataTypes } from 'sequelize';

import positionModel from './position.model';

const sequelize = new Sequelize('mysql::memory');

const employeeModel = sequelize.define('Employee', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relacion One2Many con el modelo de cargo
positionModel.hasMany(employeeModel, {
  foreignKey: 'positionId',
  as: 'position',
});

employeeModel.belongsTo(positionModel, {
  foreignKey: 'positionId',
  as: 'position',
});

// Sincronizo las tablas
sequelize
  .sync({ force: true })
  .then(() => console.log('Tablas sincronizadas'))
  .catch((err) => console.error('Error al sincronizar las tablas:', err));

export default employeeModel;
