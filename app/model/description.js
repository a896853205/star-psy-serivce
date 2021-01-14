module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
  
    const Description = app.model.define('description', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      sun_sign: INTEGER,
      moon_sign: INTEGER,
      Description: STRING(30),
    });
  
    Description.associate = () =>{
        app.model.Description.belongsTo(app.model.Sign, {
            foreignKey: 'sun_sign',
            target: 'id',
            as: 'sunSign'
        });
        app.model.Description.belongsTo(app.model.Sign, {
            foreignKey: 'moon_sign',
            target: 'id',
            as: 'moonSign',
        })
    }
        
    return Description;
  };
  