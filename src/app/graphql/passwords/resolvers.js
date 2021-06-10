import { randomBytes } from 'crypto'

import User from '~/app/models/User'
import EmailVerification from '~/app/models/EmailVerification'

import Queue from '~/lib/Queue'
import ForgotPasswordMail from '~/app/jobs/ForgotPasswordMail'

export default {
  Mutation: {
    forgotPassword: async (parent, args) => {
      const { email } = args

      const user = await User.findOne({ where: { email } })

      if (!user) throw Error('Usuário não encontrado.')

      const userHasCode = await EmailVerification.findOne({
        where: {
          userId: user.id,
          typeId: 1,
          confirmedAt: null,
        },
      })

      const raw = await randomBytes(16)
      const code = userHasCode
        ? userHasCode.code
        : raw.toString('hex').slice(0, 10)

      if (!userHasCode) {
        await EmailVerification.create({ userId: user.id, typeId: 1, code })
      }

      const { name } = user

      await Queue.add(ForgotPasswordMail.key, { name, code, email })

      return 'Email de recuperação de senha enviado com sucesso!'
    },

    resetPassword: async (root, args) => {
      const { code, oldPassword, password } = args

      const confirmation = await EmailVerification.findOne({
        where: { code, confirmedAt: null },
      })

      if (!confirmation) {
        throw Error('Você não possuí um token de recuperação de senha válido')
      }

      const user = await User.findByPk(confirmation.userId)

      if (oldPassword && !user.checkPassword(oldPassword)) {
        throw Error('Senhas não correspondem.')
      }

      await user.update({ password })

      await confirmation.update({ confirmedAt: new Date() })

      return 'Sua senha foi atualizada com sucesso'
    },
  },
}
