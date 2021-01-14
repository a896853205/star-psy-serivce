const description = require("./description");

module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const Sign = app.model.define('sign', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
    });
  
    return Sign;
  };
  