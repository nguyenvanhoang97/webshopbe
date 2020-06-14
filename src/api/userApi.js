module.exports = (app, container) => {
  const { userController } = container.resolve('controller')
  const { requireAdmin } = container.resolve('middleware')
  app.post('/user', userController.addUser)
  app.post('/user/login', userController.login)
  app.get('/user', requireAdmin, userController.getUser)
  app.delete('/user/:id', requireAdmin, userController.deleteUser)
  app.get('/user/:id', requireAdmin, userController.getUserId)
  app.put('/user/:id', requireAdmin, userController.updateUser)
  app.put('/cart', userController.addToCart)
  app.get('/cart', userController.getCartUser)
  app.delete('/cart/:id', userController.deleteCartUser)
}
