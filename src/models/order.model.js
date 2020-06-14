module.exports = (joi, mongoose) => {
  const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    phone: String,
    email: String,
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
    note: String,
    status: { type: Boolean, default: false },
    carts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'detail_cart' }]
  })
  const schema = joi.object({
    name: joi.string().required(),
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
