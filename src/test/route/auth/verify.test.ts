import { Server } from '@hapi/hapi'
import Lab from '@hapi/lab'
import { expect } from '@hapi/code'

import sinon from 'sinon'

import { getServerTest } from '../../../server/application'

import * as userDao from '../../../dao/user.dao'

const lab = Lab.script()
const { describe, it, beforeEach, afterEach } = lab

const url = '/api/auth/verify'
const method = 'POST'

describe('POST /api/auth/verify', () => {
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
        otp: 123456,
      }
    })

    expect(res.statusCode).to.equal(404)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('User does not exists')
  })

  it('responds for user already verified', async () => {

    sinon.stub(userDao, 'getUser').resolves({
      id: 1,
      is_verified: true,
    })

    const res = await server.inject({
      method,
      url,
      payload: {
        email: 'jdoe@yopmail.com',
        otp: 123456,
      }
    })

    expect(res.statusCode).to.equal(400)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('User already verified')

  })

  it('responds for user verification not found', async () => {

    sinon.stub(userDao, 'getUser').resolves({
      id: 1,
      is_verified: false,
    })

    sinon.stub(userDao, 'getUserVerification').resolves(undefined)

    const res = await server.inject({
      method,
      url,
      payload: {
        email: 'jdoe@yopmail.com',
        otp: 123456,
      }
    })

    expect(res.statusCode).to.equal(400)

    const response = JSON.parse(res.payload)
    expect(response.message).to.equal('User verification not valid')

  })

})

export { lab }
