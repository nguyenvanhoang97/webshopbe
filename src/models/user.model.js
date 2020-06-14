module.exports = (joi, mongoose) => {
  const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
    isAdmin: Boolean,
    password: String,
    carts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'detail_cart' }]
  })
  const schema = joi.object({
    name: joi.string().required(),
    username: joi.string().pattern(/^[a-zA-Z0-9]+$/).required(),
    dateCreate: joi.date(),
    dateUpdate: joi.date(),
    isAdmin: joi.boolean(),
    password: joi.string().min(6).required()
  })
  userSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }

  return mongoose.model('user', userSchema)
}
