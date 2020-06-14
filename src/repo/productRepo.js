module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Product, Comment } = schemas
  const addProduct = (p) => {
    const product = new Product(p)
    return product.save()
  }
  const getProduct = () => {
    return Product.find()
  }
  const getProductId = (id) => {
    return Product.findById(id).populate('comments')
  }
  const searchProduct = (search) => {
    return Product.find({ name: new RegExp(search, 'gi') })
  }
  const deleteProduct = (id) => {
    return Product.findByIdAndDelete(id)
  }
  const updateProduct = (id, value) => {
    return Product.findByIdAndUpdate(id, {
      $set: {
        name: value.name,
        image: value.image,
        price: value.price,
        amount: value.amount,
        description: value.description
      }
    })
  }
  const addCommentProduct = async (id, comment) => {
    const cmt = new Comment(comment)
    await cmt.save()
    return Product.findByIdAndUpdate(id, { $addToSet: { comments: cmt } }, { useFindAndModify: false })
  }
  return { addProduct, getProduct, getProductId, deleteProduct, addCommentProduct, updateProduct, searchProduct }
}
