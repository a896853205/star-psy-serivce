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
    const { INTEGER, STRING, DATE } = Sequelize;

    await queryInterface.createTable('manager_users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      password: STRING(255),
      createdAt: DATE,
      updatedAt: DATE,
    });

    queryInterface.bulkInsert('manager_users', [
      {
        id: 1,
        name: 'admin',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        ...timestamps,
      },
    ]);
  },

  down: async queryInterface => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('manager_users');
  },
};
