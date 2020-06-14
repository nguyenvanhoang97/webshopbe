const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const bodyParser = require('body-parser')
const api = require('../api')
const session = require('express-session')({
  secret: '%^&@%&#@!',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
})

const start = (container) => {
  return new Promise((resolve, reject) => {
    const { serverSettings } = container.resolve('config')
    const { verifyAccessToken } = container.resolve('middleware')
    const { port } = serverSettings
    const repo = container.resolve('repo')
    if (!repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }
    const app = express()
    morgan.token('body', function (req) { return JSON.stringify(req.body) })
    app.use(session)
    app.use(morgan(':method :url :remote-addr :status :response-time ms - :res[content-length] :body - :req[content-length]'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(helmet())
    app.use(cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true // enable set cookie
    }))
    app.set('trust proxy', 1)
    app.use(function (req, res, next) {
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
      next()
    })
    app.use(verifyAccessToken)
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
      return next()
    })
    api(container, app)
    const server = app.listen(port, () => resolve(server))
  })
}
module.exports = { start }
