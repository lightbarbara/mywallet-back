import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usersRouters from './routes/users.routes.js'
import transactionsRouters from './routes/transactions.routes.js'
dotenv.config()

export const app = express()

app.use(express.json())
app.use(cors())
app.use(usersRouters)
app.use(transactionsRouters)

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))