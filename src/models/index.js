const joi = require('@hapi/joi')
module.exports = (container) => {
  const schemas = {}
  const schemaValidator = (obj, type) => {
    if (schemas[type]) return schemas[type].validate(obj)
    return { error: `${type} not found.` }
  }
  return { schemas, schemaValidator }
}
