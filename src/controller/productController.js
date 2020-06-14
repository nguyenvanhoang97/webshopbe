module.exports = (container) => {
  const { productRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { Product } = schemas
  const addProduct = async (req, res) => {
    try {
      const product = req.body
      const file = req.file
      product.image = file.path
      const { error, value } = Product.validate(product)
      if (!error) {
        const product = await productRepo.addProduct(value)
        res.status(200).send(product)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      logger.e(e)
      res.send({ ok: false, msg: e.message })
    }
  }
  const getProduct = async (req, res) => {
    try {
      const product = await productRepo.getProduct()
      res.status(200).send(product)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const getProductId = async (req, res) => {
    try {
      const id = req.params.id
      const product = await productRepo.getProductId(id)
      res.status(200).send(product)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const deleteProduct = async (req, res) => {
    try {
      const id = req.params.id
      const product = await productRepo.deleteProduct(id)
      res.status(200).send(product)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const addCommentProduct = async (req, res) => {
    try {
      const id = req.params.id
      const comment = req.body
      const product = await productRepo.addCommentProduct(id, comment)
      res.status(200).send(product)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const searchProduct = async (req, res) => {
    try {
      const search = req.query.q
      if (!search) {
        return res.status(400).send({ ok: false })
      }
      const product = await productRepo.searchProduct(search)
      res.status(200).send(product)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const updateProduct = async (req, res) => {
    try {
      const id = req.params.id
      const product = req.body
      if (req.file) {
        const file = req.file
        product.image = file.path
        const { error, value } = Product.validate(product)
        if (!error) {
          const product = await productRepo.updateProduct(id, value)
          res.status(200).send(product)
        } else {
          res.status(400).send({ ok: false, msg: error.message })
        }
      } else {
        const { error, value } = Product.validate(product)
        if (!error) {
          const product = await productRepo.updateProduct(id, value)
          res.status(200).send(product)
        } else {
          res.status(400).send({ ok: false, msg: error.message })
        }
      }
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  return { addProduct, getProduct, getProductId, deleteProduct, addCommentProduct, updateProduct, searchProduct }
}
