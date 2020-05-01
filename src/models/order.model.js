module.exports = (joi, mongoose) => {
  const orderSchema = new mongoose.Schema({
    id_user: String,
    id_product: String,
    name: String,
    company: String,
    address: String,
    city: String,
    phone: String,
    email: String,
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
    note: String
  })
  const schema = joi.object({
    id_user: joi.string().required(),
    id_product: joi.string().required(),
    name: joi.string().required(),
    company: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().required(),
    dateCreate: joi.date(),
    dateUpdate: joi.date(),
    note: joi.string().required()
  })
  orderSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('order', orderSchema)
}
