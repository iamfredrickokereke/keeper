const Sequelize = require('sequelize');
const sequel = require('../config/sequelize');

module.exports = sequel.define(
    'contacts',
    {
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      userid: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    }
)