import { Router } from "express"
import { signIn, signUp } from "../controllers/users.controller.js"
import { validationUserSignIn, validationUserSignUp } from "../middlewares/users.middleware.js"

const router = Router()

router.post('/', validationUserSignIn, signIn)

router.post('/sign-up', validationUserSignUp, signUp)

export default router