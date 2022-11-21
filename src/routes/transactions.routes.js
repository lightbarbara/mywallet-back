import { Router } from "express"
import { deleteTransaction, getTransactions, newTransaction, updateTransaction } from "../controllers/transactions.controller.js"
import { validationAuthorization } from "../middlewares/transactions.middleware.js"

const router = Router()

router.use(validationAuthorization)

router.get('/transactions', getTransactions)

router.post('/new-transaction', newTransaction)

router.delete('/transaction', deleteTransaction)

router.put('/transaction', updateTransaction)

export default router