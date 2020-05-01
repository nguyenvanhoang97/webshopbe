module.exports = container => {
  const { schemas } = container.resolve('models')
  const { serverHelper } = container.resolve('config')
  const { User } = schemas
  const addUser = (u) => {
    u.password = serverHelper.encryptPassword(u.password)
    const user = new User(u)
    return user.save()
  }
  const login = (username, password) => {
    password = serverHelper.encryptPassword(password)
    return User.findOne({ username, password })
  }
  const getUser = () => {
    return User.find()
  }
  return { addUser, login, getUser }
}
