module.exports = (container) => {
  const { orderRepo, userRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { Order } = schemas
  const addOrder = async (req, res) => {
    try {
      const data = req.body
      const { error, value } = Order.validate(data)
      if (!error) {
        const id = req.user._id
        const user = await userRepo.getUserId(id)
        const carts = user.carts
        const order = await orderRepo.addOrder({ ...value, carts })
        await userRepo.emptyCart(id)
        res.status(200).send(order)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      logger.e(e)
      res.send({ ok: false, msg: e.message })
    }
  }
  const getOrder = async (req, res) => {
    try {
      const order = await orderRepo.getOrder()
      res.status(200).send(order)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const updateOrder = async (req, res) => {
    try {
      const id = req.params.id
      const order = await orderRepo.updateOrder(id)
      res.status(200).send(order)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const deleteOrder = async (req, res) => {
    try {
      const id = req.params.id
      const order = await orderRepo.deleteOrder(id)
      res.status(200).send(order)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const searchOrder = async (req, res) => {
    try {
      const search = req.query.q
      if (!search) {
        return res.status(400).send({ ok: false })
      }
      const order = await orderRepo.searchOrder(search)
      res.status(200).send(order)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  return { addOrder, getOrder, updateOrder, deleteOrder, searchOrder }
}
