const jwt = require('jsonwebtoken')
const { MissingParamError } = require('./erros')

module.exports = class TokenGenerator {
  constructor (secret) {
    this.secret = secret
  }

  async generate (id) {
    if (!this.secret) {
      throw new MissingParamError('secret dependency')
    }
    if (!id) {
      throw new MissingParamError('id')
    }
    return jwt.sign(id, this.secret)
  }
}
