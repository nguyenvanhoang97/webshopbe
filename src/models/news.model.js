module.exports = (joi, mongoose) => {
  const newsSchema = new mongoose.Schema({
    name: String,
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
    content: String,
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
  })
  const schema = joi.object({
    name: joi.string().required(),
    dateCreate: joi.date(),
    dateUpdate: joi.date(),
    content: joi.string().required()
  })
  newsSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('news', newsSchema)
}
