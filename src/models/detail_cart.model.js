module.exports = (joi, mongoose) => {
  const newsSchema = new mongoose.Schema({
    idProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'product', unique: true },
    amount: Number
  })
  const schema = joi.object({
    idProduct: joi.string().required(),
    amount: joi.number().integer().min(1).required()
  })
  newsSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('detail_cart', newsSchema)
}
