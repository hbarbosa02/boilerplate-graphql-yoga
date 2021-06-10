module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'emails_types',
      [
        {
          name: 'Forgot Password',
          description: 'Recuperação de senha',
        },
        {
          name: 'Financial Password',
          description: 'Cadastrar senha financeira',
        },
      ],
      {}
    )
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('emails_types', null, {})
  },
}
