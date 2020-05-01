const repo = (container) => {
  const userRepo = require('./userRepo')(container)
  const productRepo = require('./productRepo')(container)
  const commentRepo = require('./commentRepo')(container)
  const newsRepo = require('./newsRepo')(container)
  const cartRepo = require('./cartRepo')(container)
  const orderRepo = require('./orderRepo')(container)
  return { userRepo, productRepo, commentRepo, newsRepo, cartRepo, orderRepo }
}
const connect = (container) => {
  const dbPool = container.resolve('db')
  if (!dbPool) throw new Error('Connect DB failed')
  return repo(container)
}
module.exports = { connect }
