import { usersCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export async function signUp(req, res) {

    const { name, email, encryptedPassword } = req.user

    try {

        await usersCollection.insertOne({
            name,
            email,
            password: encryptedPassword
        })
        res.status(201).send({ message: 'Usuário criado' })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function signIn(req, res) {

    const user = req.user

    try {

        const token = uuid()

        await sessionsCollection.insertOne({
            token,
            userId: user._id
        })

        res.send({ 'token': token })

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }

}