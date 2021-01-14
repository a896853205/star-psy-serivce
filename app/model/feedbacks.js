module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Feedback = app.model.define('feedbacks', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    descriptionId: INTEGER,
    userId: INTEGER,
    mark: STRING(30),
    createdAt: DATE,
    updatedAt: DATE,
  });

  Feedback.associate = () => {
    app.model.Feedback.belongsTo(app.model.Description, {
      foreignKey: 'descriptionId',
      target: 'id',
      as: 'feedbackDescription',
    });
    app.model.Feedback.belongsTo(app.model.User, {
      foreignKey: 'userId',
      target: 'id',
      as: 'feedbackUser',
    });
  };
  return Feedback;
};
