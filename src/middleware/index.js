module.exports = (container) => {
  const { serverHelper } = container.resolve('config')
  const dontNeedAccessToken = ['/user/login', '/product', '/news', '/user']
  const verifyAccessToken = (req, res, next) => {
    if (req.session.user) {
      req.user = req.session.user
      return next()
    }
    const accessToken = req.headers['x-access-token']
    if (accessToken) {
      serverHelper.verifyToken(accessToken).then(user => {
        req.user = user
        return next()
      }).catch(() => {
        res.status(403).send({ ok: false, msg: 'Login required' })
      })
    } else {
      if (req.url.indexOf('/file') === 0 || dontNeedAccessToken.includes(req.url)) {
        return next()
      }
      res.status(403).send({ ok: false, msg: 'Login required' })
    }
  }
  const requireAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(401).send({ ok: false, msg: 'Admin required' })
    }
  }
  return { verifyAccessToken, requireAdmin }
}
