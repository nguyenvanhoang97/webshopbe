module.exports = (app, container) => {
  const { productController } = container.resolve('controller')
  const { requireAdmin } = container.resolve('middleware')
  const upload = container.resolve('upload')
  app.post('/product', requireAdmin, upload.single('image'), productController.addProduct)
  app.get('/product', productController.getProduct)
  app.get('/product/:id', productController.getProductId)
  app.delete('/product/:id', requireAdmin, productController.deleteProduct)
  app.put('/product/:id', requireAdmin, upload.single('image'), productController.updateProduct)
  app.put('/comment/:id', productController.addCommentProduct)
}
