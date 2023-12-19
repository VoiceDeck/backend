export default ({ app }) => {
  app.get('/ping', (req, res) => {
    res.json({ pong: true })
  })
}
