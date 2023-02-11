import Lab from '@hapi/lab'
import { expect } from '@hapi/code'

import { getServer } from '../../server/application'
import { Server } from '@hapi/hapi'

const lab = Lab.script()
const { describe, it, beforeEach, afterEach } = lab

export { lab }

describe('GET /swagger', () => {
  let server: Server

  beforeEach(async () => {
    server = await getServer()
  })

  afterEach(async () => {
    await server.stop()
  })

  it('responds with 200 for loading swagger docs', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/api/swagger.json',
    })

    expect(res.statusCode).to.equal(200)
  })
})
