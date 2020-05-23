module.exports = container => {
  const { schemas } = container.resolve('models')
  const { serverHelper } = container.resolve('config')
  const { User, Cart } = schemas
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
  const getUserId = (id) => {
    return User.findById(id)
  }
  const deleteUser = (id) => {
    return User.findByIdAndDelete(id)
  }
  const updateUser = (id, value) => {
    return User.findByIdAndUpdate(id, { $set: { name: value.name, username: value.username, isAdmin: value.isAdmin, password: value.password } }, {})
  }
  const addToCart = async (idUser, idProduct) => {
    const cart = new Cart(idProduct)
    await cart.save()
    return User.findByIdAndUpdate(idUser, { $addToSet: { cart: cart } }, { useFindAndModify: false })
  }
  return { addUser, login, getUser, deleteUser, getUserId, addToCart, updateUser }
}
