const request = require('supertest')
const app = require('../config/app')

describe('JSON Parser middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test-json-parser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test-json-parser')
      .send({ name: 'Mango' })
      .expect({ name: 'Mango' })
  })
})
