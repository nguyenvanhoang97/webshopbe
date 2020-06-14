module.exports = (container, app) => {
  require('./userApi')(app, container)
  require('./productApi')(app, container)
  require('./newsApi')(app, container)
  require('./commentApi')(app, container)
  require('./cartApi')(app, container)
  require('./orderApi')(app, container)
  require('./fileApi')(app, container)
  require('./searchApi')(app, container)
}
