import Sequelize, { Model } from 'sequelize'

class EmailType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'emails_types',
      }
    )

    return this
  }
}

export default EmailType
