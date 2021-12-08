module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      image: {
        type: Sequelize.TEXT,
      },
      latitude: {
        type: Sequelize.TEXT,
      },
      longitude: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Chais');
  },
};
