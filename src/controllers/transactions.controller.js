import { transactionsCollection } from "../database/db.js";
import dayjs from 'dayjs'
import { ObjectId } from "mongodb";

export async function getTransactions(req, res) {

    const user = res.locals.user

    try {

        const transactions = await transactionsCollection.find({ userId: user._id }).toArray()

        res.status(200).send(transactions)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function newTransaction(req, res) {

    const user = res.locals.user

    let { value, description, type } = req.body

    value = Number(value)

    try {

        await transactionsCollection.insertOne({
            date: dayjs().format('DD/MM'),
            description,
            value,
            userId: user._id,
            type
        })

        return res.status(200).send({ message: 'Transação salva' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function deleteTransaction(req, res) {

    const { id } = req.params

    try {

        await transactionsCollection.deleteOne({ _id: ObjectId(id) })

        res.status(200).send({ message: 'Transação deletada' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function updateTransaction(req, res) {

    const { value, description, type } = req.body

    const { id } = req.params

    await transactionsCollection.updateOne({ _id: ObjectId(id) }, {
        $set: {
            value,
            description,
            type
        }
    })

    res.status(200).send({ message: 'Transação atualizada' })

    try {

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}