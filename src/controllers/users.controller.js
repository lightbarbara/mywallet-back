import { usersCollection, sessionsCollection } from "../database/db.js";
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcrypt'

export async function signUp(req, res) {

    const { name, email, password } = req.user

    const encryptedPassword = bcrypt.hashSync(password, 15)

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

    const { email, password } = req.user

    try {

        const user = await usersCollection.findOne({ email })

        if (!user) {
            return res.status(401).send({ message: 'Email não cadastrado' })
        }

        const validatePassword = bcrypt.compareSync(password, user.password)

        console.log(validatePassword)

        if (!validatePassword) {
            return res.status(401).send({ message: 'Senha incorreta' })
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