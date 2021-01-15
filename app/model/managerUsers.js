module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const ManagerUsers = app.model.define("manager_users", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(255),
  });

  return ManagerUsers;
};
