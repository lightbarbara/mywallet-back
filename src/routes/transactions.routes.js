import { Router } from "express"
import { getTransactions, newTransaction } from "../controllers/transactions.controller.js"
import { validationAuthorization, validationSchema } from "../middlewares/transactions.middleware.js"

const router = Router()

router.use(validationAuthorization)

router.get('/transactions', getTransactions)

router.use(validationSchema)

router.post('/new-transaction', newTransaction)

// router.delete('/transaction', deleteTransaction)

// router.put('/transaction', updateTransaction)

export default router