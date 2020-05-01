module.exports = (joi, mongoose) => {
  const commentSchema = new mongoose.Schema({
    id_connect: String,
    name: String,
    email: { type: String, unique: true },
    dateCreate: { type: Date, default: Date.now },
    dateUpdate: { type: Date, default: Date.now },
    comment: String
  })
  const schema = joi.object({
    id_connect: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).required(),
    dateCreate: joi.date(),
    dateUpdate: joi.date(),
    comment: joi.string().required()
  })
  commentSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }

  return mongoose.model('comment', commentSchema)
}
