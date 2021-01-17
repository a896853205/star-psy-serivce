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

    await queryInterface.createTable('signs', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      createdAt: DATE,
      updatedAt: DATE,
    });

    queryInterface.bulkInsert(
      'signs',
      [
        { id: 1, name: '白羊', ...timestamps },
        { id: 2, name: '金牛', ...timestamps },
        { id: 3, name: '双子', ...timestamps },
        { id: 4, name: '巨蟹', ...timestamps },
        { id: 5, name: '狮子', ...timestamps },
        { id: 6, name: '处女', ...timestamps },
        { id: 7, name: '天秤', ...timestamps },
        { id: 8, name: '天蝎', ...timestamps },
        { id: 9, name: '射手', ...timestamps },
        { id: 10, name: '魔羯', ...timestamps },
        { id: 11, name: '水瓶', ...timestamps },
        { id: 12, name: '双鱼', ...timestamps },
      ],
      {}
    );
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
