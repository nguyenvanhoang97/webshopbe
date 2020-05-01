module.exports = (container) => {
  const { newsRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { News } = schemas
  const addNews = async (req, res) => {
    try {
      const news = req.body
      const { error, value } = News.validate(news)
      if (!error) {
        const news = await newsRepo.addNews(value)
        res.status(200).send(news)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      logger.e(e)
      res.send({ ok: false, msg: e.message })
    }
  }
  return { addNews }
}
