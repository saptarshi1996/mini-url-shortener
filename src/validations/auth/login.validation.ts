import Joi from 'joi'

export default {
  payload: Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  })
}
