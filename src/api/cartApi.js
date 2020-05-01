module.exports = (app, container) => {
  const { cartController } = container.resolve('controller')
  app.post('/cart', cartController.addCart)
}
