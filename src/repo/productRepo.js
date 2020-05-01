module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Product } = schemas
  const addProduct = (p) => {
    const product = new Product(p)
    return product.save()
  }
  const getProduct = () => {
    return Product.find()
  }
  const getProductId = (id) => {
    return Product.findById(id)
  }
  return { addProduct, getProduct, getProductId }
}
