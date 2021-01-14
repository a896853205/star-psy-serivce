module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable('signs', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('sign');
     */
    await queryInterface.dropTable('signs');
  },
};
