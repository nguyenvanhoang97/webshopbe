module.exports = (app, container) => {
  const { cartController } = container.resolve('controller')
  const { requireAdmin } = container.resolve('middleware')
  app.post('/cart', requireAdmin, cartController.addCart)
  app.delete('/cart', requireAdmin, cartController.deleteCart)
}
