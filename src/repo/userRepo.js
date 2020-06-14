module.exports = container => {
  const { schemas } = container.resolve('models')
  const { serverHelper } = container.resolve('config')
  const { User, DetailCart } = schemas
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
    return User.findByIdAndUpdate(id, {
      $set: {
        name: value.name,
        username: value.username,
        password: value.password,
        isAdmin: value.isAdmin
      }
    }, {})
  }
  const addToCart = async (idUser, idDetail) => {
    return User.findByIdAndUpdate(idUser, { $addToSet: { carts: idDetail } }, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const getCartUser = (id) => {
    return User.findById(id).populate({
      path: 'carts',
      populate: {
        path: 'idProduct'
      }
    })
  }
  const emptyCart = (idUser) => {
    return User.findByIdAndUpdate(idUser, { carts: [] }, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const searchUser = (search) => {
    return User.find({ name: new RegExp(search, 'gi') })
  }
  const deleteCartUser = (id) => {
    return DetailCart.findByIdAndDelete(id)
  }
  return {
    addUser,
    login,
    getUser,
    deleteUser,
    getUserId,
    addToCart,
    updateUser,
    getCartUser,
    deleteCartUser,
    emptyCart,
    searchUser
  }
}
