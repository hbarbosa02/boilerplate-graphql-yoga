import User from '~/app/models/User'

export default {
  Mutation: {
    createSession: async (root, args) => {
      const { email, password } = args

      const user = await User.findOne({ where: { email } })

      if (!user) throw Error('Email ou senha incorretos.')

      if (!user.checkPassword(password))
        throw Error('Email ou senha incorretos.')

      return user.generateToken()
    },
  },
}
