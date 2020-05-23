module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Comment } = schemas
  const addComment = (c) => {
    const comment = new Comment(c)
    return comment.save()
  }
  const getCommentId = (id) => {
    return Comment.find({id_product: id})
  }
  return { addComment, getCommentId }
}
