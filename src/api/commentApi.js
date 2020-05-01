module.exports = (app, container) => {
  const { commentController } = container.resolve('controller')
  app.post('/comment', commentController.addComment)
}
