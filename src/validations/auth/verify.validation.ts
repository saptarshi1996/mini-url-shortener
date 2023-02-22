import Joi from 'joi'

export default {
  payload: Joi.object({
    email: Joi.string().email().required().label('Email'),
    otp: Joi.number().required().label('Otp'),
  })
}
