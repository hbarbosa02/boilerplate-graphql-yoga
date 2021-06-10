import Sequelize from 'sequelize'

import User from '~/app/models/User'
import EmailType from '~/app/models/EmailType'
import EmailVerification from '~/app/models/EmailVerification'

import databaseConfig from '~/config/database'

const models = [User, EmailType, EmailVerification]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
