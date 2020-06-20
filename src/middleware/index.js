module.exports = (container) => {
  const { serverHelper } = container.resolve('config')
  const dontNeedAccessToken = ['/user/login', '/product', '/news', '/comment', '/user', '/search', '/cmt']
  const checkDontNeed = (url) => {
    for (let i = 0; i < dontNeedAccessToken.length; i++) {
      if ((new RegExp(dontNeedAccessToken[i], 'gi')).test(url)) {
        return true
      }
    }
    return false
  }

  const verifyAccessToken = (req, res, next) => {
    if (req.session.user) {
      req.user = req.session.user
      return next()
    }
    const accessToken = req.headers['x-access-token']
    if (!accessToken) {
      if (req.url.indexOf('/file') === 0 || checkDontNeed(req.url)) {
        return next()
      }
      res.status(419).send({ ok: false, msg: 'Token hết hạn' })
    } else {
      serverHelper.verifyToken(accessToken).then(user => {
        req.user = user
        return next()
      }).catch(() => {
        res.status(403).send({ ok: false, msg: 'Login required' })
      })
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
