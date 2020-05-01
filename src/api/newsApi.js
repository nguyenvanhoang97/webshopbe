module.exports = (app, container) => {
  const { newsController } = container.resolve('controller')
  app.post('/news', newsController.addNews)
}
