module.exports = (container) => {
  const { orderRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { Order } = schemas
  const addOrder = async (req, res) => {
    try {
      const order = req.body
      const { error, value } = Order.validate(order)
      if (!error) {
        const order = await orderRepo.addOrder(value)
        res.status(200).send(order)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      logger.e(e)
      res.send({ ok: false, msg: e.message })
    }
  }
  return { addOrder }
}
