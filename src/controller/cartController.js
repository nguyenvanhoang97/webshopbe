module.exports = (container) => {
  const { cartRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { Cart } = schemas
  const addCart = async (req, res) => {
    try {
      const cart = req.body
      const { error, value } = Cart.validate(cart)
      if (!error) {
        const cart = await cartRepo.addCart(value)
        res.status(200).send(cart)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      logger.e(e)
      res.send({ ok: false, msg: e.message })
    }
  }
  return { addCart }
}
