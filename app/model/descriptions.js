module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Description = app.model.define('Descriptions', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sunSign: INTEGER,
    moonSign: INTEGER,
    description: STRING(30),
    createdAt: DATE,
    updatedAt: DATE,
  });

  Description.associate = () => {
    console.dir();
    app.model.Descriptions.belongsTo(app.model.Signs, {
      foreignKey: 'moonSign',
      as: 'moonSignI'
    });

    app.model.Descriptions.belongsTo(app.model.Signs, {
      foreignKey: 'sunSign',
      as: 'sunSignI',
    });
  };

  return Description;
};
