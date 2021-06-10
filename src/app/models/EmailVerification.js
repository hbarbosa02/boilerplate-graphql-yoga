import Sequelize, { Model } from 'sequelize'

class EmailVerification extends Model {
  static init(sequelize) {
    super.init(
      {
        typeId: Sequelize.BIGINT,
        code: Sequelize.STRING,
        value: Sequelize.STRING,
        confirmedAt: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'emails_verifications',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user' })
    this.belongsTo(models.EmailType, { foreignKey: 'type_id', as: 'type' })
  }
}

export default EmailVerification
