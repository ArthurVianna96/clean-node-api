const { MissingParamError, InvalidParamError } = require('../../utils/erros/index')

module.exports = class AuthUseCase {
  constructor (loadUserByEmailRepository, encrypter, tokenGenerator) {
    this.loadUserByEmailRepository = loadUserByEmailRepository
    this.encrypter = encrypter
    this.tokenGenerator = tokenGenerator
  }

  async auth (email, password) {
    if (!email) {
      throw new MissingParamError('email')
    }
    if (!password) {
      throw new MissingParamError('password')
    }
    if (!this.loadUserByEmailRepository) {
      throw new MissingParamError('loadUserByEmailRepository')
    }
    if (!this.loadUserByEmailRepository.load) {
      throw new InvalidParamError('no load method')
    }
    const user = await this.loadUserByEmailRepository.load(email)
    const isValidPassword = user && await this.encrypter.compare(password, user.password)
    if (isValidPassword) {
      const accessToken = await this.tokenGenerator.createToken(user.id)
      return accessToken
    }
    return null
  }
}
