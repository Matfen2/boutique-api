import { Router } from 'express'
import { register, login } from '../controllers/authController.js'
import { validate } from '../middlewares/validate.js'
import { authSchema } from '../validators/authValidator.js'

const router = Router()

router.post('/register', validate(authSchema), register)
router.post('/login', validate(authSchema), login)

export default router