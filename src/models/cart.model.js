module.exports = (joi, mongoose) => {
  const newsSchema = new mongoose.Schema({
    idProduct: String
  })
  const schema = joi.object({
    idProduct: joi.string().required()
  })
  newsSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('cart', newsSchema)
}
