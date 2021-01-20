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
    app.model.Descriptions.belongsTo(app.model.Signs, {
      // as: 'moonSignI',
      foreignKey: 'moonSign',
      sourceKey: 'id',
      //type: INTEGER,
    });

    app.model.Descriptions.belongsTo(app.model.Signs, {
      as: 'sunSignI',
      foreignKey: 'sunSign',
      // sourceKey: 'id',
      //type: INTEGER,
    });
  };

  return Description;
};
