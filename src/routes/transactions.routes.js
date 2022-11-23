import { Router } from "express"
import { deleteTransaction, getTransactions, newTransaction, updateTransaction } from "../controllers/transactions.controller.js"
import { validationAuthorization, validationSchema } from "../middlewares/transactions.middleware.js"

const router = Router()

router.use(validationAuthorization)

router.get('/transactions', getTransactions)

router.post('/new-transaction', validationSchema, newTransaction)

router.delete('/transaction/:id', deleteTransaction)

router.put('/transaction/:id', validationSchema, updateTransaction)

export default router