const path = require('path')
module.exports = (app, container) => {
  app.use('/file', (req, res) => {
    const pathImg = req.url
    const imgUrl = path.join(path.dirname(require.main.filename), pathImg.replace(/\\/g, '/'))
    res.sendFile(imgUrl)
  })
}
