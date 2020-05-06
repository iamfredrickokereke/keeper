const Sequelize = require('sequelize'),
      vars = require('./vars'),
      sequel = new Sequelize(vars.DB_NAME, vars.DB_USER, vars.DB_PASS, {
          dialect: 'mysql',
          pool: {
            max: 5,
            min: 0,
            acquired: 30000,
            idle: 10000
        }
    });

// sequel
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
// });

module.exports = sequel;