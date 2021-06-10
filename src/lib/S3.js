import path from 'path'
import AWS from 'aws-sdk'
import crypto from 'crypto'

import s3Config from '~/config/s3.js'

class S3 {
  constructor() {
    this.filter = ['image/png', 'image/jpg', 'image/jpeg']
  }

  async upload(file, pathName) {
    const { filename, mimetype, createReadStream } = await file
    const fileStream = createReadStream()

    if (!this.filter.includes(mimetype))
      throw Error('Tipo de imagem não permitida')

    const hash = await crypto.randomBytes(16)
    const cryptoName = hash.toString('hex') + path.extname(filename)

    let auxPath = ''
    if (pathName && pathName !== '') auxPath = pathName

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME + auxPath,
      Key: cryptoName,
      Body: fileStream,
      ContentType: mimetype,
      ACL: 'public-read',
    }

    const s3bucket = new AWS.S3(s3Config)

    const promise = new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })

    return promise
  }
}

export default new S3()
