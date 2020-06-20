module.exports = (app, container) => {
  const { orderController } = container.resolve('controller')
  const { requireAdmin } = container.resolve('middleware')
  app.post('/order', orderController.addOrder)
  app.get('/order', requireAdmin, orderController.getOrder)
  app.put('/order/:id', requireAdmin, orderController.updateOrder)
  app.delete('/order/:id', requireAdmin, orderController.deleteOrder)
}
