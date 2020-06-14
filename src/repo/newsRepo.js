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
    return News.findById(id).populate('comments')
  }
  const deleteNews = (id) => {
    return News.findByIdAndDelete(id)
  }
  const updateNews = (id, data) => {
    return News.findByIdAndUpdate(id, { $set: { name: data.name, image: data.image, content: data.content } })
  }
  const addCommentNews = async (id, comment) => {
    const cmt = new Comment(comment)
    await cmt.save()
    return News.findByIdAndUpdate(id, { $addToSet: { comments: cmt } }, { useFindAndModify: false })
  }
  const searchNews = (search) => {
    return News.find({ name: new RegExp(search, 'gi') })
  }
  return { addNews, getNews, getNewsId, deleteNews, updateNews, addCommentNews, searchNews }
}
