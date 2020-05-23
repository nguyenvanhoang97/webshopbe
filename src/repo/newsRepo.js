module.exports = container => {
  const { schemas } = container.resolve('models')
  const { News, Comment } = schemas
  const addNews = (n) => {
    const news = new News(n)
    return news.save()
  }
  const getNews = () => {
    return News.find()
  }
  const getNewsId = (id) => {
    return News.findById(id)
  }
  const deleteNews = (id) => {
    return News.findByIdAndDelete(id)
  }
  const updateNews = (id, data) => {
    return News.findByIdAndUpdate(id, { $set: { name: data.name, content: data.content } })
  }
  const addCommentNews = async (id, comment) => {
    const cmt = new Comment(comment)
    await cmt.save()
    return News.findByIdAndUpdate(id, { $addToSet: { comments: cmt } }, { useFindAndModify: false })
  }
  return { addNews, getNews, getNewsId, deleteNews, updateNews, addCommentNews }
}

