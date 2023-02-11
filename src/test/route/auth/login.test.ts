import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { expect } from '@hapi/code'

import sinon from 'sinon'

import { getServerTest } from '../../../server/application'

import * as userDao from '../../../dao/user.dao'

const lab = Lab.script()
const { describe, it, beforeEach, afterEach } = lab

const url = '/api/auth/userLogin'
const method = 'POST'

describe('POST /api/auth/userLogin', () => {
  let server: Server

  beforeEach(async () => {
    server = await getServerTest()
  })

  afterEach(async () => {
    sinon.restore()
    await server.stop()
  })

  it('responds for bad payload', async () => {
    const res = await server.inject({
      method,
      url,
      payload: {},
    })

    expect(res.statusCode).to.equal(400)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('Invalid request payload input')
  })

  it('responds for user not found', async () => {

    sinon.stub(userDao, 'getUser').resolves(undefined)

    const res = await server.inject({
      method,
      url,
      payload: {
        email: 'jdoe@yopmail.com',
        password: '12345',
      }
    })

    expect(res.statusCode).to.equal(404)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('User does not exists')
  })
})

export { lab }
