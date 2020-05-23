module.exports = (app, container) => {
  const { commentController } = container.resolve('controller')
  app.post('/comment', commentController.addComment)
  app.get('/comment/:id', commentController.getCommentId)
}
