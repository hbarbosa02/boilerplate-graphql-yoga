import Sequelize, { Model } from 'sequelize'
import { hashSync, compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    this.addHook('beforeSave', user => {
      if (user.password) user.password_hash = hashSync(user.password, 8)
    })

    return this
  }

  checkPassword(password) {
    return compareSync(password, this.password_hash)
  }

  generateToken() {
    return jwt.sign({ id: this.id }, 'iroman')
  }
}

export default User
