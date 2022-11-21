import { Router } from "express"
import { signIn, signUp, signOut } from "../controllers/users.controller.js"
import { validationUserSignIn, validationUserSignUp } from "../middlewares/users.middleware.js"
import { validationAuthorization } from "../middlewares/transactions.middleware.js";

const router = Router()

router.post('/', validationUserSignIn, signIn)

router.post('/sign-up', validationUserSignUp, signUp)

router.delete('/', validationAuthorization, signOut)

export default router