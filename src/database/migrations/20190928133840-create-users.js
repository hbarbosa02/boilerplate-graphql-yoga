module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING(80),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('users')
  },
}
