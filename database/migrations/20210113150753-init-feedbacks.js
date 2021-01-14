module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable('feedbacks', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      mark: STRING(30),
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      descriptionId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'descriptions',
          },
          key: 'id',
        },
      },
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('feedback');
     */
    await queryInterface.dropTable('feedbacks');
  },
};
