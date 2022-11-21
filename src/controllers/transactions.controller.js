import { transactionsCollection } from "../database/db.js";
import dayjs from 'dayjs'

export async function getTransactions(req, res) {

    const user = res.locals.user

    try {

        const transactions = await transactionsCollection.find({ userId: user._id }).toArray()

        console.log(user)
        console.log(transactions)
        
        res.status(200).send(transactions)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function newTransaction(req, res) {

    const user = res.locals.user

    const { value, description } = req.body

    try {

        await transactionsCollection.insertOne({
            date: dayjs().format('DD/MM'),
            description,
            value,
            userId: user._id
        })

        return res.status(200).send({message: 'Transação salva'})

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function deleteTransaction(req, res) {

    const user = res.locals.user

    try {

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function updateTransaction(req, res) {

    const user = res.locals.user

    try {

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}