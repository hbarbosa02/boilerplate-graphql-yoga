export default {
  port: process.env.PORT || 4000,
  secret: process.env.JWT_TOKEN || 'iroman',
  fronthost: process.env.FRONT_HOST || 'localhost:3000',
}
