module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('emails_verifications', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      type_id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references: {
          model: 'emails_types',
          key: 'id',
        },
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
      code: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      value: {
        allowNull: true,
        type: Sequelize.STRING(200),
      },
      confirmed_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
  },

  down: queryInterface => {
    return queryInterface.dropTable('emails_verifications')
  },
}
