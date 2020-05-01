module.exports = (joi, mongoose) => {
  const newsSchema = new mongoose.Schema({
    id_user: String,
    id_product: String
  })
  const schema = joi.object({
    id_user: joi.string().required(),
    id_product: joi.string().required()
  })
  newsSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('cart', newsSchema)
}
