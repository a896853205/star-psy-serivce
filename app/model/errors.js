module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Error = app.model.define('errors', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    error: STRING(255),
    errorInfo: STRING(255),
    userAgent: STRING(255),
    createdAt: DATE,
    updatedAt: DATE,
  });
  return Error;
};
