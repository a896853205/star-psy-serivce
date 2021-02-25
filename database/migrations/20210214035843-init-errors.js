const timestamps = {
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { INTEGER, STRING, DATE, TEXT } = Sequelize;
    await queryInterface.createTable('errors', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      error: STRING(255),
      errorInfo: TEXT,
      userAgent: STRING(255),
      createdAt: DATE,
      updatedAt: DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('errors');
  },
};
