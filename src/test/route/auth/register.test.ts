import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { expect } from '@hapi/code'

import sinon from 'sinon'

import { getServerTest } from '../../../server/application'

import * as userDao from '../../../dao/user.dao'

const lab = Lab.script()
const { describe, it, beforeEach, afterEach } = lab

const url = '/api/auth/userRegister'
const method = 'POST'

describe('POST /api/auth/userRegister', () => {
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

    sinon.stub(userDao, 'getUser').resolves({
      id: 1,
    })

    const res = await server.inject({
      method,
      url,
      payload: {
        first_name: 'john',
        last_name: 'doe',
        email: 'jdoe@yopmail.com',
        password: '12345',
      }
    })

    expect(res.statusCode).to.equal(400)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('User already exists')
  })
})

export { lab }
