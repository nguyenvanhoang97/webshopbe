const { initDI } = require('./di')
const config = require('./config')
const logger = require('./logger')
const middleware = require('./middleware')
const server = require('./server')
const controller = require('./controller')
const helper = require('./helper')
const models = require('./models')
const { connect, ObjectId } = require('./database')
const multer = require('multer')
const storage = multer.diskStorage(
  {
    destination: 'uploads/',
    filename: function (req, file, cb) {
      const arr = file.originalname.split('.')
      const ext = arr.pop()
      cb(null, `${arr.join('.')}-${Date.now()}.${ext}`)
    }
  }
)
const upload = multer({ storage })
const repo = require('./repo')
const EventEmitter = require('events').EventEmitter
const mediator = new EventEmitter()
console.log('User cab Service')
mediator.once('di.ready', container => {
  console.log('di.ready, starting connect db ', config.dbSettings)
  container.registerValue('config', config)
  container.registerValue('ObjectId', ObjectId)
  container.registerValue('middleware', middleware)
  container.registerValue('logger', logger)
  container.registerValue('mediator', mediator)
  container.registerValue('upload', upload)
  connect(container, mediator)
  mediator.on('db.ready', db => {
    console.log('db.ready, starting server')
    container.registerValue('helper', helper(container))
    container.registerValue('db', db)
    container.registerValue('models', models(container))
    const repository = repo.connect(container)
    container.registerValue('repo', repository)
    container.registerValue('controller', controller(container))
    container.registerValue('middleware', middleware(container))
    server.start(container).then(app => {
      console.log('Server started at port', app.address().port)
    })
  })
})

initDI(mediator)
