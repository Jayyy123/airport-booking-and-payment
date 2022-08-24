const { Sequelize } =  require("sequelize");

const sequelize = new Sequelize('order', 'postgres', '', {
    host: 'localhost',
    dialect:'postgres'
  });

module.exports = sequelize