module.exports = (container) => {
  const { userRepo } = container.resolve('repo')
  const logger = container.resolve('logger')
  const { schemas } = container.resolve('models')
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
        res.status(200).send(user)
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
  return { addUser, login, getUser }
}
