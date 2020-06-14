module.exports = (joi, mongoose) => {
  const newsSchema = new mongoose.Schema({
    name: String,
    image: String,
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
    content: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }]
  })
  const schema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    dateCreate: joi.date(),
    dateUpdate: joi.date(),
    content: joi.string().required()
  })
  newsSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }
  return mongoose.model('news', newsSchema)
}
