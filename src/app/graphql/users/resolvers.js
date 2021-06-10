import User from '~/app/models/User'

import { authenticated } from '~/util'

export default {
  Query: {
    me: authenticated((parent, args, ctx) => User.findByPk(ctx.user.id)),
    users: authenticated(() => User.findAll()),
  },

  Mutation: {
    createUser: async (parent, args) => {
      const { name, email, password } = args.input

      const user = await User.findOne({ where: { email } })

      if (user) throw Error('Usuário já existe.')

      return User.create({ name, email, password })
    },
  },
}
