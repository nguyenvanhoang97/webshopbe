module.exports = (app, container) => {
  const { userController } = container.resolve('controller')
  app.post('/user', userController.addUser)
  app.post('/user/login', userController.login)
  app.get('/user', userController.getUser)
  app.delete('/user/:id', userController.deleteUser)
  app.get('/user/:id', userController.getUserId)
  app.put('/user/:id', userController.updateUser)
  app.put('/cart/:id', userController.addToCart)
}
