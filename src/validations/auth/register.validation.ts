import Joi from 'joi'

export default {
  payload: Joi.object({
    first_name: Joi.string().required().label('First Name'),
    last_name: Joi.string().required().label('Last Name'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  })
}
