module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Cart } = schemas
  const addCart = (c) => {
    const cart = new Cart(c)
    return cart.save()
  }
  return { addCart }
}
