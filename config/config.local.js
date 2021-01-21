const { localDBKey } = require('../key.js');

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'star-psy',
  user: 'root',
  password: localDBKey,
  timezone: '+08:00',
  define: {
    timestamps: false,
  },
  query: {
    nest: true,
  },
};
