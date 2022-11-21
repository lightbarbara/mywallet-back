import { Router } from "express"
import { signIn, signUp } from "../controllers/users.controller.js"

const router = Router()

router.post('/', signIn)

router.post('/sign-up', signUp)

export default router