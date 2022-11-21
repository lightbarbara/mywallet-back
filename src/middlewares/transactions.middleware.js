import { sessionsCollection, usersCollection } from "../database/db.js"
import { transactionSchema } from "../schemas/transactions.schema.js"

export async function validationAuthorization(req, res, next) {

    const validation = transactionSchema.validate(req.body, { abortEarly: false })

    const { authorization } = req.headers

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace('Bearer ', '')

    try {

        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            res.status(422).send({ message: errors })
            return
        }

        const session = await sessionsCollection.findOne({ token })

        if (!session) {
            return res.sendStatus(401)
        }

        const user = await usersCollection.findOne({ _id: session.userId })

        res.locals.user = user

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}