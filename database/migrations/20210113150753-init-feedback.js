module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING } = Sequelize;

    await queryInterface.createTable('feedback', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      description_id: INTEGER,
      user_id: INTEGER,
      mark: STRING(30),
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('feedback');
     */
    await queryInterface.dropTable('feedback');
  },
};
