module.exports = {
  isValidValue: true,
  value: '',
  hashedValue: '',
  async compare (value, hashedValue) {
    this.value = value
    this.hashedValue = hashedValue
    return this.isValidValue
  }
}
