const descriptions = require('./descriptions.json');
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
    const { INTEGER, TEXT, DATE } = Sequelize;

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
      description: TEXT,
      createdAt: DATE,
      updatedAt: DATE,
    });

    for (let i = 0; i < descriptions.length; i++) {
      descriptions[i] = {
        ...timestamps,
        ...descriptions[i],
      };
    }

    await queryInterface.bulkInsert('descriptions', descriptions);
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
