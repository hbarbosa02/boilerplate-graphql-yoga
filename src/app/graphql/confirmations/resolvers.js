import User from '~/app/models/User'
import EmailVerification from '~/app/models/EmailVerification'

import Queue from '~/lib/Queue'
import AccountConfirmationMail from '~/app/jobs/AccountConfirmationMail'

export default {
  Mutation: {
    forgotConfirmation: async (root, args) => {
      const { email } = args

      const user = await User.findOne({ where: { email } })

      if (!user) throw Error('Usuário não encontrado.')

      const confirmation = await EmailVerification.findByPk(user.id)

      if (!confirmation) throw Error('Código de Confirmação não encontrado.')

      if (confirmation.confirmedAt) throw Error('Sua conta já foi verificada')

      const { name } = user
      const { code } = confirmation

      confirmation.send_confirmed_at = new Date()

      await confirmation.save()

      await Queue.add(AccountConfirmationMail.key, { code, name, email })

      return 'Email de confirmação de conta enviado com sucesso!'
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
