module.exports = (app, container) => {
  const { productController } = container.resolve('controller')
  app.post('/product', productController.addProduct)
  app.get('/product', productController.getProduct)
  app.get('/product/:id', productController.getProductId)
}
