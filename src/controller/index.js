module.exports = (container) => {
  const userController = require('./userController')(container)
  const productController = require('./productController')(container)
  const commentController = require('./commentController')(container)
  const newsController = require('./newsController')(container)
  const cartController = require('./cartController')(container)
  const orderController = require('./orderController')(container)
  return { userController, productController, commentController, newsController, cartController, orderController }
}
