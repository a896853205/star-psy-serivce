module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING } = Sequelize;

    await queryInterface.createTable('description', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      sun_sign: INTEGER,
      moon_sign: INTEGER,
      Description: STRING(30),
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('description');
     */
    await queryInterface.dropTable('description');
  },
};
