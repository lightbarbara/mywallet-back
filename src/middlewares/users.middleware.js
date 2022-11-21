import { sessionsCollection, usersCollection } from "../database/db.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/users.schema.js";
import bcrypt from 'bcrypt'

export async function validationUserSignIn(req, res, next) {
    const { email, password } = req.body

    const validation = userSignInSchema.validate(req.body, { abortEarly: false })

    try {

        const userExists = await usersCollection.findOne({ email })

        if (!userExists) {
            return res.status(401).send({ message: 'Email não cadastrado' })
        }

        const validatePassword = bcrypt.compareSync(password, userExists.password)

        if (!validatePassword) {
            return res.status(401).send({ message: 'Senha incorreta' })
        }

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            res.status(422).send({ message: errors })
            return
        }

        const userLoggedIn = await sessionsCollection.findOne({ userId: userExists._id })

        if (userLoggedIn) {
            console.log(userLoggedIn.userId)
            await sessionsCollection.deleteOne({ userId: userLoggedIn.userId })
            res.status(200).send({ message: 'Deslogada a sessão anterior' })
        }

        res.locals.user = userExists

        next()

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

export async function validationUserSignUp(req, res, next) {
    const { name, email, password } = req.body

    try {

        const userExists = await usersCollection.findOne({ email })

        if (userExists) {
            return res.status(409).send({ message: 'Usuário já cadastrado' })
        }

        const validation = userSignUpSchema.validate(req.body, { abortEarly: false })

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            res.status(422).send({ message: errors })
            return
        }

        res.locals.user = { name, email, password }

        next()

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}