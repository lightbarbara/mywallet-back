import { usersCollection } from "../database/db.js";
import { userSignInSchema, userSignUpSchema } from "../schemas/users.schema.js";

export function validationUserSignIn(req, res, next) {
    const { email, password } = req.body

    const validation = userSignInSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    req.user = { email, password }

    next()
}

export async function validationUserSignUp(req, res, next) {
    const { name, email, password } = req.body

    const userExists = await usersCollection.findOne({ email })

    if (userExists) {
        return res.status(409).send({message: 'Usuário já cadastrado'})
    }

    const validation = userSignUpSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)
        res.status(422).send({ message: errors })
        return
    }

    req.user = { name, email, password }

    next()
}