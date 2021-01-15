module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Feedback = app.model.define("feedbacks", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    descriptionId: INTEGER,
    userId: INTEGER,
    mark: STRING(30),
    createdAt: DATE,
    updatedAt: DATE,
  });

  Feedback.associate = () => {
    app.model.Feedbacks.belongsTo(app.model.Descriptions, {
      foreignKey: "descriptionId",
      target: "id",
      type: INTEGER,
    });
    app.model.Feedbacks.belongsTo(app.model.Users, {
      foreignKey: "userId",
      target: "id",
      type: INTEGER,
    });
  };
  return Feedback;
};
