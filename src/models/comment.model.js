module.exports = (joi, mongoose) => {
  const commentSchema = new mongoose.Schema({
    nameComment: String,
    email: { type: String },
    comment: String
  })
  const schema = joi.object({
    nameComment: joi.string().required(),
    email: joi.string().pattern(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/).required(),
    comment: joi.string().required()
  })
  commentSchema.statics.validate = (obj) => {
    return schema.validate(obj)
  }

  return mongoose.model('comment', commentSchema)
}
