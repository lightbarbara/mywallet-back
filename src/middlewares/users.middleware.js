import { usersCollection } from "../database/db.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/users.schema.js";
import bcrypt from 'bcrypt'

export async function validationUserSignIn(req, res, next) {
    const { email, password } = req.body

    const validation = userSignInSchema.validate(req.body, { abortEarly: false })

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

    req.user = userExists

    next()
}

export async function validationUserSignUp(req, res, next) {
    const { name, email, password } = req.body

    const encryptedPassword = bcrypt.hashSync(password, 15)

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

    req.user = { name, email, encryptedPassword }

    next()
}