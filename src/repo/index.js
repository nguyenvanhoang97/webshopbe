const repo = (container) => {
  const menuRepo = require('./menuRepo')(container)
  return { menuRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('db')
  if (!dbPool) throw new Error('Connect DB failed')
  return repo(container)
}

module.exports = { connect }
