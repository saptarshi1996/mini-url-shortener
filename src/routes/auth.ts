import { Router } from 'express'

import wrapper from '../wrappers/async'

import {
  resendToken,
  userLogin,
  userRegister,
  verifyUser
} from '../controllers/auth'

const router = Router()

router.post('/login', wrapper(userLogin))
router.post('/register', wrapper(userRegister))
router.post('/verify', wrapper(verifyUser))
router.post('/resend', wrapper(resendToken))

export default router
