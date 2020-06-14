module.exports = (app, container) => {
  const { orderController } = container.resolve('controller')
  app.post('/order', orderController.addOrder)
  app.get('/order', orderController.getOrder)
  app.put('/order/:id', orderController.updateOrder)
  app.delete('/order/:id', orderController.deleteOrder)
}
