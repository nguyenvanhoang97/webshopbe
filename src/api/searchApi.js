module.exports = (app, container) => {
  const { productController, userController, orderController, newsController } = container.resolve('controller')
  app.get('/search/product', productController.searchProduct)
  app.get('/search/user', userController.searchUser)
  app.get('/search/order', orderController.searchOrder)
  app.get('/search/news', newsController.searchNews)
}
