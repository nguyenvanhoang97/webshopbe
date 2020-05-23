module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Cart } = schemas
  const addCart = (c) => {
    const cart = new Cart(c)
    return cart.save()
  }
  const getCart = (id) => {
    return Cart.findById({id_user: id})
  }
  const deleteCart = (id) => {
    return Cart.findByIdAndDelete(id)
  }
  return { addCart, getCart, deleteCart }
}
