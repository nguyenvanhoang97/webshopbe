module.exports = (app, container) => {
  const { orderController } = container.resolve('controller')
  app.post('/order', orderController.addOrder)
}
