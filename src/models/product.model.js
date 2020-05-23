module.exports = (joi, mongoose) => {
  const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    amount: Number,
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
    description: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
  })
  const schema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    price: joi.number().min(0).required(),
    amount: joi.number().min(0).required(),
    dateCreate: joi.date(),
    dateUpdate: joi.date(),
    description: joi.string().required()
  })
  productSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('product', productSchema)
}
