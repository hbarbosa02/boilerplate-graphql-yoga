export default {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || null,
    pass: process.env.EMAIL_PASS || null,
  },
  default: {
    from: process.env.EMAIL_FROM,
  },
}
