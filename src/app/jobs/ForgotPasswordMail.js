import Mail from '~/lib/Mail'

import appConfig from '~/config/app'

class ForgotPasswordMail {
  get key() {
    return 'ForgotPasswordMail'
  }

  async handle({ data }) {
    const { name, code, email } = data

    await Mail.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      template: 'forgot_password',
      context: {
        name,
        code,
        host: appConfig.fronthost,
      },
    })
  }
}

export default new ForgotPasswordMail()
