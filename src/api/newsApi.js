module.exports = (app, container) => {
  const { newsController } = container.resolve('controller')
  const { requireAdmin } = container.resolve('middleware')
  const upload = container.resolve('upload')
  app.post('/news', requireAdmin, upload.single('image'), newsController.addNews)
  app.get('/news', newsController.getNews)
  app.get('/news/:id', newsController.getNewsId)
  app.delete('/news/:id', requireAdmin, newsController.deleteNews)
  app.put('/news/:id', requireAdmin, upload.single('image'), newsController.updateNews)
  app.put('/cmt/:id', newsController.addCommentNews)
}
