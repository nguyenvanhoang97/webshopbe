module.exports = (container) => {
  const { newsRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { News } = schemas
  const addNews = async (req, res) => {
    try {
      const news = req.body
      const file = req.file
      news.image = file.path
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
  const getNews = async (req, res) => {
    try {
      const news = await newsRepo.getNews()
      res.status(200).send(news)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const getNewsId = async (req, res) => {
    try {
      const id = req.params.id
      const news = await newsRepo.getNewsId(id)
      res.status(200).send(news)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const deleteNews = async (req, res) => {
    try {
      const id = req.params.id
      const news = await newsRepo.deleteNews(id)
      res.status(200).send(news)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const addCommentNews = async (req, res) => {
    try {
      const id = req.params.id
      const comment = req.body
      const news = await newsRepo.addCommentNews(id, comment)
      res.status(200).send(news)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const updateNews = async (req, res) => {
    try {
      const id = req.params.id
      const news = req.body
      if (req.file) {
        const file = req.file
        news.image = file.path
        const { error, value } = News.validate(news)
        if (!error) {
          const news = await newsRepo.updateNews(id, value)
          res.status(200).send(news)
        } else {
          res.status(400).send({ ok: false, msg: error.message })
        }
      } else {
        const { error, value } = News.validate(news)
        if (!error) {
          const news = await newsRepo.updateNews(id, value)
          res.status(200).send(news)
        } else {
          res.status(400).send({ ok: false, msg: error.message })
        }
      }
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const searchNews = async (req, res) => {
    try {
      const search = req.query.q
      if (!search) {
        return res.status(400).send({ ok: false })
      }
      const news = await newsRepo.searchNews(search)
      res.status(200).send(news)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  return { addNews, getNews, getNewsId, deleteNews, updateNews, addCommentNews, searchNews }
}
