module.exports = (joi, mongoose) => {
  const newsSchema = new mongoose.Schema({
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    amount: Number
  })
  const schema = joi.object({
    idProduct: joi.string().required(),
    amount: joi.number()
  })
  newsSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('cart', newsSchema)
}
