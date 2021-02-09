const { remoteKey } = require('../key.js');

exports.sequelize = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  database: 'star-psy',
  user: 'root',
  password: remoteKey,
  timezone: '+08:00',
  define: {
    timestamps: true,
    underscored: false,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
  query: {
    nest: true,
  },
};
