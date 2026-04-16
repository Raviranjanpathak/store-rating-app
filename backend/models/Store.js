const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [20, 60], // ✅ assignment rule
    },
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // ✅ email validation
    },
  },

  address: {
    type: DataTypes.STRING(400), // ✅ max 400 chars
    allowNull: false,
  },

  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Store;