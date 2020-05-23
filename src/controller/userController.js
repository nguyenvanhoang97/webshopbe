module.exports = (container) => {
  const { userRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
  const { serverHelper } = container.resolve('config')
  const { User } = schemas
  const addUser = async (req, res) => {
    try {
      const user = req.body
      const { error, value } = User.validate(user)
      if (!error) {
        const user = await userRepo.addUser(value)
        res.status(200).send(user)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      logger.e(e)
      res.send({ ok: false, msg: e.message })
    }
  }
  const login = async (req, res) => {
    try {
      const { username, password } = req.body
      if (username && password) {
        const user = await userRepo.login(username, password)
        if (user) {
          const token = serverHelper.genToken(user.toObject())
          req.session.user = user.toObject()
          res.status(200).send({ ok: true, token, user })
        } else {
          res.status(400).send({ ok: false, msg: 'User not found' })
        }
      } else {
        res.status(400).send({ ok: false })
      }
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const getUser = async (req, res) => {
    try {
      const user = await userRepo.getUser()
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const deleteUser = async (req, res) => {
    try {
      const id = req.params.id
      const user = await userRepo.deleteUser(id)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const getUserId = async (req, res) => {
    try {
      const id = req.params.id
      const user = await userRepo.getUserId(id)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const updateUser = async (req, res) => {
    try {
      const id = req.params.id
      const user = req.body
      const { error, value } = User.validate(user)
      if (!error) {
        const user = await userRepo.updateUser(id, value)
        res.status(200).send(user)
      } else {
        res.status(400).send({ ok: false, msg: error.message })
      }
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  const addToCart = async (req, res) => {
    try {
      const idProduct = req.params.id
      const idUser = req.user._id
      const user = await userRepo.addToCart(idUser, idProduct)
      res.status(200).send(user)
    } catch (e) {
      res.status(500).send({ ok: false, msg: e.message })
    }
  }
  return { addUser, login, getUser, deleteUser, getUserId, updateUser, addToCart }
}
