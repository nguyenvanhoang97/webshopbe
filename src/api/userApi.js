module.exports = (app, container) => {
  const { userController } = container.resolve('controller')
  app.post('/user', userController.addUser)
  app.post('/user/login', userController.login)
  app.get('/user', userController.getUser)
}
