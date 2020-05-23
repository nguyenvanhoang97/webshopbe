module.exports = (app, container) => {
  const { newsController } = container.resolve('controller')
  app.post('/news', newsController.addNews)
  app.get('/news', newsController.getNews)
  app.get('/news/:id', newsController.getNewsId)
  app.delete('/news/:id', newsController.deleteNews)
  app.put('/news/:id', newsController.updateNews)
}
