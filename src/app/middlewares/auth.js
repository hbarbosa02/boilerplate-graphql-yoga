import * as jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-core'
import { promisify } from 'util'

import appConfig from '~/config/app'

export default async (resolve, root, args, context, info) => {
  const authHeader = context.headers.authorization

  if (!authHeader) return resolve(root, args, context, info)

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, appConfig.secret)

    context.user = decoded
  } catch (e) {
    return new AuthenticationError('Not authorised')
  }

  return resolve(root, args, context, info)
}
