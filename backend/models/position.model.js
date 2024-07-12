import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('mysql::memory');

const positionModel = sequelize.define('Position', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default positionModel;
