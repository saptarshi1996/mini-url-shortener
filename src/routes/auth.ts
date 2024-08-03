import { Router } from 'express'

import wrapper from '../wrappers/async'

import {
  userLogin
} from '../controllers/auth'

const router = Router()

router.get('/login', wrapper(userLogin))

export default router
