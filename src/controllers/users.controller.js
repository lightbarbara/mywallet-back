import { usersCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export async function signUp(req, res) {
    const { name, email, password } = req.body

    const encryptedPassword = bcrypt.hashSync(password, 15)

    try {
        const user = await usersCollection.insertOne({
            name,
            email,
            password: encryptedPassword
        })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function signIn(req, res) {
    const { email, password } = req.body

    try {
        const user = await usersCollection.findOne({ email })

        if (!user) {
            return res.status(401).send({message: 'Email não cadastrado'})
        }

        const validatePassword = bcrypt.compareSync(password, user.password)

        if (!validatePassword) {
            return res.status(401).send({message: 'Senha incorreta'})
        }

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