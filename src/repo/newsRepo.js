module.exports = container => {
  const { schemas } = container.resolve('models')
  const { News } = schemas
  const addNews = (n) => {
    const news = new News(n)
    return news.save()
  }
  return { addNews }
}

