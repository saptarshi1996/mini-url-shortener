import Joi from 'joi'

export default {
  headers: Joi.object({ authorization: Joi.string().required() }).options({ allowUnknown: true })
}
