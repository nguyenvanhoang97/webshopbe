module.exports = (container) => {
  const verifyAccessToken = (req, res, next) => {
    next()
  }
  return { verifyAccessToken }
}
