const sequelize =  require("./db");
const {Sequelize, DataTypes} =  require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

const order = sequelize.define(
      "order",
      {
        from_airport : {
            type:DataTypes.STRING
        },
        to_airport : {
            type:DataTypes.STRING
        },
        paystack_id : {
            type:DataTypes.STRING
        },
        total : {
            type:DataTypes.STRING
        },
        status : {
            type:DataTypes.STRING
        },
        from_country : {
            type:DataTypes.STRING
        },
        to_country : {
            type:DataTypes.STRING
        }
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: "order",
      }
    )
order.sync()


module.exports = {order}