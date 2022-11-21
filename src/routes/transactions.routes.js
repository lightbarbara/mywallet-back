import { Router } from "express"
import { validationAuthorization } from "../middlewares/transactions.middleware"

const router = Router()

router.use(validationAuthorization)

router.post('/new-transaction', )

router.get('/transactions', )

router.delete('/transaction', )

router.put('/transaction', )

export default router