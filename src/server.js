import app from './app'

app.start(({ port }) => {
  console.log(`Server is running on localhost:${port}`)
})
