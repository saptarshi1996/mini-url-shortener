import { Router } from 'express'

import wrapper from '../wrappers/async'

import auth from '../middlewares/auth'

import { getUser } from '../controllers/user'

const router = Router()

router.get('/', auth, wrapper(getUser))

export default router
