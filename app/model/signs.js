module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Sign = app.model.define('signs', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    createdAt: DATE,
    updatedAt: DATE,
  });
  
  // Sign.associate = () => {
  //   app.model.Signs.hasOne(app.model.Descriptions, {
  //     foreignKey: 'sunSign',
  //     sourceKey: 'id',
  //   });
  //   app.model.Signs.hasOne(app.model.Descriptions, {
  //     foreignKey: 'moonSign',
  //     sourceKey: 'id',
  //   });
  // };

  return Sign;
};
