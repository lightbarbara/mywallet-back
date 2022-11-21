import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import joi from 'joi'
import usersRouters from './routes/users.routes.js'
import transactionsRouters from './routes/transactions.routes.js'
dotenv.config()

// validacoes com joi

export const app = express()

app.use(express.json())
app.use(cors())
app.use(usersRouters)
app.use(transactionsRouters)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))