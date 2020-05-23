module.exports = (container) => {
  const { commentRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { Comment } = schemas
  const addComment = async (req, res) => {
    try {
      const comment = req.body
      const { error, value } = Comment.validate(comment)
      if (!error) {
        const comment = await commentRepo.addComment(value)
        res.status(200).send(comment)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      logger.e(e)
      res.send({ ok: false, msg: e.message })
    }
  }
  const getCommentId = async (req, res) => {
    try {
      const id = req.params.id
      const comment = await commentRepo.getCommentId(id)
      res.status(200).send(comment)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  return { addComment, getCommentId }
}
