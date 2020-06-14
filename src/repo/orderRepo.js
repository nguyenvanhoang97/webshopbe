module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Order } = schemas
  const addOrder = async (obj) => {
    const order = new Order(obj)
    await order.save()
    return order
  }
  const getOrder = () => {
    return Order.find().populate({
      path: 'carts',
      populate: {
        path: 'idProduct'
      }
    })
  }
  const updateOrder = (id, value) => {
    return Order.findByIdAndUpdate(id, {
      $set: {
        status: true
      }
    }, {})
  }
  const deleteOrder = (id) => {
    return Order.findByIdAndDelete(id)
  }
  const searchOrder = (search) => {
    return Order.find({ name: new RegExp(search, 'gi') }).populate({
      path: 'carts',
      populate: {
        path: 'idProduct'
      }
    })
  }
  return { addOrder, getOrder, updateOrder, deleteOrder, searchOrder }
}
