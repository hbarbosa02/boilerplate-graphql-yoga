const { hashSync } = require('bcryptjs')

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'iroman',
        email: 'iroman@avengers.com',
        password_hash: hashSync('123456789', 8),
      },
    ])
  },

  down: queryInterface => queryInterface.bulkDelete('users'),
}
