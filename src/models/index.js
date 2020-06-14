const joi = require('@hapi/joi')
const mongoose = require('mongoose')
module.exports = (container) => {
  const Comment = require('./comment.model')(joi, mongoose)
  const Product = require('./product.model')(joi, mongoose)
  const DetailCart = require('./detail_cart.model')(joi, mongoose)
  const News = require('./news.model')(joi, mongoose)
  const User = require('./user.model')(joi, mongoose)
  const Cart = require('./cart.model')(joi, mongoose)
  const Order = require('./order.model')(joi, mongoose)
  const schemas = { User, Product, Comment, News, Cart, Order, DetailCart }
  const schemaValidator = (obj, type) => {
    if (schemas[type]) return schemas[type].validate(obj)
    return { error: `${type} not found.` }
  }
  return { schemas, schemaValidator }
}
