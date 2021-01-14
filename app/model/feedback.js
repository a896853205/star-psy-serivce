module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const Feedback = app.model.define('feedback', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      description_id: INTEGER,
      user_id: INTEGER,
      mark: STRING(30),
    });
    
    Feedback.associate = ()=>{
      model.app.Feedback.belongsTo(app.model.Description, {
        foreignKey: 'description_id',
        target: 'id',
        as: 'feedback-description',
      });
      model.app.Feedback.belongsTo(app.model.User, {
        foreignKey: 'user_id',
        target: 'id',
        as: 'feedback-user',
      });
    }
    return Feedback;
  };
  