module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    openId: STRING(36),
    name: STRING(30),
    year: INTEGER,
    month: INTEGER,
    day: INTEGER,
    hour: INTEGER,
    minute: INTEGER,
    timeZone: INTEGER,
    sunSign: INTEGER,
    moonSign: INTEGER,
    createdAt: DATE,
    updatedAt: DATE,
  });

  return User;
};
