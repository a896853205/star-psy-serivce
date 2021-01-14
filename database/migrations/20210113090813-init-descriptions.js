module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable('descriptions', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      sunSign: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'signs',
          },
          key: 'id',
        },
      },
      moonSign: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'signs',
          },
          key: 'id',
        },
      },
      description: STRING(30),
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('description');
     */
    await queryInterface.dropTable('descriptions');
  },
};
