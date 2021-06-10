import Mail from '~/lib/Mail'

import appConfig from '~/config/app'

class AccountConfirmationMail {
  get key() {
    return 'AccountConfirmationMail'
  }

  async handle({ data }) {
    const { code, name, email } = data

    await Mail.sendMail({
      to: email,
      subject: 'Account confirmation',
      template: 'confirmation',
      context: {
        code,
        name,
        host: appConfig.fronthost,
      },
    })
  }
}

export default new AccountConfirmationMail()
