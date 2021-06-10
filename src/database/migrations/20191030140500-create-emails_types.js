module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('emails_types', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(24),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(200),
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('emails_types')
  },
}
