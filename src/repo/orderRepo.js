module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Order } = schemas
  const addOrder = (o) => {
    const order = new Order(o)
    return order.save()
  }
  return { addOrder }
}
