require("dotenv").config(); 

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DBConfigLink, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

module.exports = sequelize;
