module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING } = Sequelize;

    await queryInterface.createTable('sign', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('sign');
     */
    await queryInterface.dropTable('sign');
  },
};
