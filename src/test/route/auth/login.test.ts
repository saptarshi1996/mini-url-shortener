import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { expect } from '@hapi/code'

import sinon from 'sinon'

import { getServerTest } from '../../../server/application'

import * as userDao from '../../../dao/user.dao'
import * as userHelper from '../../../helpers/user.helper'

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

  it('responds for user not verified', async () => {
    sinon.stub(userDao, 'getUser').resolves({
      id: 1,
      is_verified: false,
    })

    const res = await server.inject({
      method,
      url,
      payload: {
        email: 'jdoe@yopmail.com',
        password: '12345',
      }
    })

    expect(res.statusCode).to.equal(401)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('User not verified')
  })

  it('responds for user invalid password', async () => {
    sinon.stub(userDao, 'getUser').resolves({
      id: 1,
      is_verified: true,
      password: '$2a10$s4upKX2UGaSGhTNydvrAqeHnFDsp5Vh3r8TmBmeoDti8xu7I1CQsy'
    })

    const res = await server.inject({
      method,
      url,
      payload: {
        email: 'jdoe@yopmail.com',
        password: '12345',
      }
    })

    expect(res.statusCode).to.equal(401)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('Invalid credentials')
  })

  it('responds for user created', async () => {
    sinon.stub(userDao, 'getUser').resolves({
      id: 1,
      is_verified: true,
      password: '$2a$10$s4upKX2UGaSGhTNydvrAqeHnFDsp5Vh3r8TmBmeoDti8xu7I1CQsy'
    })

    sinon.stub(userHelper, 'generateToken').resolves('123456')

    const res = await server.inject({
      method,
      url,
      payload: {
        email: 'jdoe@yopmail.com',
        password: '12345',
      }
    })

    expect(res.statusCode).to.equal(200)

    const response = JSON.parse(res.payload)
    expect(response.token).to.equal('123456')
  })
})

export { lab }
