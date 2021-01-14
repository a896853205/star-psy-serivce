module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Description = app.model.define('descriptions', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sunSign: INTEGER,
    moonSign: INTEGER,
    description: STRING(30),
    createdAt: DATE,
    updatedAt: DATE,
  });

  Description.associate = () => {
    app.model.Description.belongsTo(app.model.Sign, {
      foreignKey: 'sunSign',
      target: 'id',
      as: 'sunSign',
    });
    app.model.Description.belongsTo(app.model.Sign, {
      foreignKey: 'moonSign',
      target: 'id',
      as: 'moonSign',
    });
  };

  return Description;
};
