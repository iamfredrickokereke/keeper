const Sequelize = require('sequelize');
const sequel = require('../config/sequelize');

module.exports = sequel.define(
    'user',
    {
        name: {
            allowNull: false,
            type: Sequelize.STRING
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING
          }
    }
)